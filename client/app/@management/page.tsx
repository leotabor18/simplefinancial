import { getClientList } from '../api/external/clientAPI';
import SelectChips from '../components/select-chips';
import TeamsList from '../components/teams-list';
import { ClientData, ClientDataResponse, SearchParams } from '../util/interfaces';
import { SelectChipsData } from '../util/types';
import ClientComponent from './page.client';

interface Params {

}

const Clients = async ({ searchParams } : { searchParams :  Promise<SearchParams> }) => {
  const queryParams: SearchParams = await searchParams;
  const response: ClientDataResponse[] = await getClientList(queryParams);

  const data: ClientData[] = response.map((client: ClientDataResponse): ClientData => {
    const categoryData: SelectChipsData[] = client.categories.map(item => {
      return {
        id: item.categoryId,
        name: item.name
      }
    });

    const companyData: SelectChipsData[] = client.businesses.map(item => {
      return {
        id: item.businessId,
        name: item.name
      }
    });

    const categories = client.categories.length ? <SelectChips data={categoryData} label='Subscriptions' /> : '---';
    const teams = client.teams.length ? <TeamsList data={client.teams} />: '---';
    const businesses = client.businesses.length ? <SelectChips data={companyData} label='Companies'/> : '---';
    
    return {
      id: client.clientId,
      company: businesses,
      name: `${client.lastName}, ${client.firstName}`,
      category: categories,
      teamAssigned: teams,
      status: client.status
    }
  });

  return <ClientComponent data={data}/>
}

export default Clients