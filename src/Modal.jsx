const Modal = (props) => {
  return (
    <>
      <div
        onClick={props.onClose}
        className="backdrop w-full h-full left-0 top-0 absolute "
      ></div>
      <div className="modal mt-4 left-0 right-0 mx-auto w-full p-5 rounded-3xl flex flex-col items-center text-white">
        <h2 className="font-bold text-2xl">{props.title}</h2>
        <p>{props.message}</p>
        <button
          className="text-white bg-gradient-to-r from-purple-500/70 to-pink-500/70 py-2 px-8 rounded-full mt-2"
          onClick={props.onClose}
        >
          Okay
        </button>
      </div>
    </>
  );
};

export default Modal;
