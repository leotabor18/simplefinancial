import MainHeader from './components/client/header';

const Home = async () => {
  console.log('Hello');
  
  return (
    <div className="flex flex-col w-full">
      <MainHeader />
    </div>
  );
};

export default Home;
