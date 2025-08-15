import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useLoading } from "../../contexts/LoadingContext";

interface Gift {
  id: string;
  title: string;
  price: number;
  image: string;
  buyedBy: string;
}

export default function GiftList() {
  const navigate = useNavigate();
  const { setLoadingWithDelay } = useLoading();
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchGifts() {
      try {
        const giftsCollection = collection(db, "gifts");
        const giftsSnapshot = await getDocs(giftsCollection);
        const giftsList = giftsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Gift[];

        const availableGifts = giftsList.filter((gift) => !gift.buyedBy);
        setGifts(availableGifts);
      } catch (error) {
        console.error("Error fetching gifts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGifts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGifts = gifts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(gifts.length / itemsPerPage);

  return (
    <section id="presentes" className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-pink-600 mb-8 text-center">
        Lista de Presentes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {currentGifts.map(({ id, title, price, image }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={image}
              alt={title}
              className="w-32 h-32 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
              {title}
            </h3>
            <p className="text-pink-600 font-bold mb-4">
              R$ {price.toFixed(2)}
            </p>
            <button
              onClick={() => {
                setLoadingWithDelay(true);
                navigate(`/gift/${id}`);
                setLoadingWithDelay(false);
              }}
              className="bg-pink-600 text-white rounded-md px-4 py-2 hover:bg-pink-700 transition"
            >
              Presentear
            </button>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-center mt-10 space-x-3">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-pink-600 text-white hover:bg-pink-700"
          }`}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-4 py-2 rounded-md ${
                currentPage === pageNum
                  ? "bg-pink-800 text-white"
                  : "bg-pink-600 text-white hover:bg-pink-700"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-pink-600 text-white hover:bg-pink-700"
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
}
