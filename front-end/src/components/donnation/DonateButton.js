import axios from "axios";

const DonateButton = ({ donation, amount }) => {
    const data = {
      priceId: "price_1MxvEKH0YIiHzOkmwMY2wjkQ",
      donation,
      amount,
    };
  const handlePayment = () => {
    axios
        .post(`http://localhost:8000/donnation/payment`, {
          data
      })
        .then((res) => {
            const benefit = parseInt(donation.benefit) + parseInt(amount);
            console.log("BENEFIT",benefit)
            axios.put(
              `http://localhost:8000/donnation/updateDonation/${donation._id}`,
              {
                benefit
              }
            );
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {amount > 0 ? (
        <button onClick={() => handlePayment()} className="btn btn-info">
          Donate
        </button>
      ) : (
        <button className="btn btn-info" disabled>
          Donate
        </button>
      )}
    </>
  );
};
export default DonateButton;
