import SingleBookCard from "./SingleBookCard";

const BookCards = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((item) => (
       <SingleBookCard key={item._id}  book = {item} />
      ))}
    </div>
  );
};

export default BookCards;
