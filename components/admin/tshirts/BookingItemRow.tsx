"use client";

import { Trash2, Plus, Minus } from "lucide-react";

const SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "3XL",
];

interface Props {
  index: number;

  item: {
    tshirt_size: string;
    quantity: number;
    price: number;
  };

  update: (
    index: number,
    item: any
  ) => void;

  remove: (index: number) => void;
}

export default function BookingItemRow({
  index,
  item,
  update,
  remove,
}: Props) {
  const subtotal =
    item.quantity * item.price;

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="mb-4 flex items-center justify-between">

        <h3 className="font-semibold text-orange-600">
          Item {index + 1}
        </h3>

        <button
          type="button"
          onClick={() => remove(index)}
          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
        >
          <Trash2 size={18} />
        </button>

      </div>

      <div className="grid gap-4 lg:grid-cols-4">

        {/* Size */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Size
          </label>

          <select
            value={item.tshirt_size}
            onChange={(e) =>
              update(index, {
                ...item,
                tshirt_size:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          >
            {SIZES.map((size) => (
              <option
                key={size}
                value={size}
              >
                {size}
              </option>
            ))}
          </select>

        </div>

        {/* Quantity */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Quantity
          </label>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={() =>
                update(index, {
                  ...item,
                  quantity: Math.max(
                    1,
                    item.quantity - 1
                  ),
                })
              }
              className="rounded-lg border p-2"
            >
              <Minus size={16} />
            </button>

            <div className="w-12 text-center font-bold">
              {item.quantity}
            </div>

            <button
              type="button"
              onClick={() =>
                update(index, {
                  ...item,
                  quantity:
                    item.quantity + 1,
                })
              }
              className="rounded-lg border p-2"
            >
              <Plus size={16} />
            </button>

          </div>

        </div>

        {/* Price */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Price
          </label>

          <div className="rounded-xl border bg-gray-50 p-3 font-bold">
            ₹{item.price}
          </div>

        </div>

        {/* Subtotal */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Subtotal
          </label>

          <div className="rounded-xl bg-green-50 p-3 text-lg font-bold text-green-700">
            ₹{subtotal}
          </div>

        </div>

      </div>

    </div>
  );
}
