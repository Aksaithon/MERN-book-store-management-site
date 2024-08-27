import { useState } from "react";
import BackBtn from "../components/BackBtn";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "default" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert("An errer happened. Please check the console");
        enqueueSnackbar("An errer happened. Please check the console", {
          variants: "error",
        });
        console.log(error);
      });
  };
  return (
    <div className="p-4 ">
      <BackBtn />
      <h1 className="text-3xl my-4">Delete Book</h1>

      {loading ? <Spinner /> : ""}

      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text=2xl">Are you sure you want to delete this book?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-fit rounded-2xl"
          onClick={handleDeleteBook}
        >
          Yes, delete this book
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;