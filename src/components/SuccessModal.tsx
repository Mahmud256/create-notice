export default function SuccessModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-green-600 font-semibold">
          Notice Published Successfully
        </h3>

        <button
          onClick={onClose}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
}
