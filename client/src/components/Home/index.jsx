import Button from "../Button";

const Home = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className="">
            <nav className="w-full h-[70px] bg-[#A0153E] flex items-center justify-between">
                <h1 className="text-[white] text-[25px] ml-5">Playground</h1>
                <button
                    className="bg-[white] w-[120px] font-[bold] text-sm cursor-pointer mr-5 px-0 py-3 rounded-[20px] border-[none]; 
                    outline: none;"
                    onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <Button />
        </div>
    );
};

export default Home;
