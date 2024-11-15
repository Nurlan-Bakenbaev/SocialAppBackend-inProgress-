const DaisyCard = ({ img, text }) => {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={img} alt="post-banner" />
        </figure>
        <div className="card-body text-center">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};
export default DaisyCard;
