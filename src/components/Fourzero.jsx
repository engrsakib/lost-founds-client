import { useNavigate } from 'react-router-dom';



const Fourzero = () => {
  const navigate = useNavigate();
    return (
      <>
        
        <div className="flex flex-col items-center my-6">
          <img
            className="mx-auto w-[350px] md:w-[650px] rounded-lg"
            src="/7741849_3747371.jpg"
            alt=""
          />
          <button
            onClick={() => navigate("/")}
            className="btn w-[350px] md:w-[650px] btn-accent mt-9"
          >
            GO Home
          </button>
        </div>
        
      </>
    );
};

export default Fourzero;