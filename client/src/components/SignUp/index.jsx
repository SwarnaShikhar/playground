import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const { data: res } = await axios.post(url, data);
            navigate("/login");
            console.log(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className="w-full min-h-screen bg-neutral-100 flex items-center justify-center">
            <div className="w-[900px] h-[500px] flex shadow-[0px_3px_3px_-2px_rgb(0_0_0_/_20%),0px_3px_4px_0px_rgb(0_0_0_/_14%),0px_1px_8px_0px_rgb(0_0_0_/_12%)] rounded-[10px]">
                <div className="flex-1 flex flex-col items-center justify-center bg-[#A0153E] rounded-tl-[10px] rounded-bl-[10px]">
                    <h1 className="text-[white] text-[35px] self-center mt-0">Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className="bg-[white] w-[180px] font-[bold] text-sm cursor-pointer px-0 py-3 rounded-[20px] border-[none]; outline: none;">
                            <div className="text-2xl">Sing In</div>
                        </button>
                    </Link>
                </div>
                <div className="flex-[2] flex flex-col items-center justify-center bg-[#673F69] rounded-tr-[10px] rounded-br-[10px]">
                    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                        <h1 className="text-[40px] mt-0">Create Account</h1>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className="w-[370px] bg-[#edf5f3] text-sm mx-0 my-[5px] p-[15px] rounded-[10px] border-[none];
                            outline: none;"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className="w-[370px] bg-[#edf5f3] text-sm mx-0 my-[5px] p-[15px] rounded-[10px] border-[none];
                            outline: none;"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="w-[370px] bg-[#edf5f3] text-sm mx-0 my-[5px] p-[15px] rounded-[10px] border-[none];
                            outline: none;"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="w-[370px] bg-[#edf5f3] text-sm mx-0 my-[5px] p-[15px] rounded-[10px] border-[none];
                            outline: none;"
                        />
                        {error && <div className="w-[370px] text-sm bg-[#f34646] text-[white] text-center mx-0 my-[5px] p-[15px] rounded-[5px]">{error}</div>}
                        <button type="submit" className="bg-[white] w-[180px] font-[bold] text-sm cursor-pointer px-0 py-3 rounded-[20px] border-[none];
  outline: none;">
                            <div className="text-2xl">Sing Up</div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
