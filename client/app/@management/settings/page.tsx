import Title from '@/app/components/title';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

const Settings = () => {
  return (
    <div className=''>
      <Title name={'Settings'} containerStyle='mb-8'/>
      <LogoutLink className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
        Logout
      </LogoutLink>
    </div>
  )
}

export default Settings