"use client";

import BookingItemRow from "./BookingItemRow";
import { Plus } from "lucide-react";

interface Item {
  tshirt_size: string;
  quantity: number;
  price: number;
}

interface Props {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

export default function BookingItems({
  items,
  setItems,
}: Props) {
  function updateItem(
    index: number,
    item: Item
  ) {
    const copy = [...items];
    copy[index] = item;
    setItems(copy);
  }

  function removeItem(index: number) {
    if (items.length === 1) return;

    const copy = [...items];
    copy.splice(index, 1);

    setItems(copy);
  }

  function addItem() {
    setItems([
      ...items,
      {
        tshirt_size: "M",
        quantity: 1,
        price: 330,
      },
    ]);
  }

  const totalPieces = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const grandTotal = items.reduce(
    (sum, item) =>
      sum + item.quantity * item.price,
    0
  );

  return (
    <div className="space-y-6 rounded-3xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-orange-600">
          👕 T-Shirts
        </h2>

        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
        >
          <Plus size={18} />
          Add Size
        </button>

      </div>

      {items.map((item, index) => (
        <BookingItemRow
          key={index}
          index={index}
          item={item}
          update={updateItem}
          remove={removeItem}
        />
      ))}

      <div className="rounded-2xl bg-orange-50 p-5">

        <div className="flex justify-between py-2">

          <span className="font-medium">
            Total Pieces
          </span>

          <span className="text-lg font-bold">
            {totalPieces}
          </span>

        </div>

        <div className="mt-2 flex justify-between border-t pt-4">

          <span className="text-lg font-bold">
            Grand Total
          </span>

          <span className="text-3xl font-bold text-orange-600">
            ₹{grandTotal}
          </span>

        </div>

      </div>

    </div>
  );
}
