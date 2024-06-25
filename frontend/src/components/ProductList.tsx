"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";
import { fetchProducts, Product } from "@/lib/api"; // Adjust the path if necessary

const PRODUCT_PER_PAGE = 8;

const ProductList = ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts({
          name: searchParams?.name || "",
          category: categoryId,
          type: searchParams?.type ? [searchParams.type] : ["physical", "digital"],
          min_price: searchParams?.min || 0,
          max_price: searchParams?.max || 999999,
          limit: limit || PRODUCT_PER_PAGE,
          offset: searchParams?.page ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE) : 0,
          sort: searchParams?.sort || "",
        });

        setProducts(data);
        setCurrentPage(searchParams?.page ? parseInt(searchParams.page) : 0);
        setHasNext(data.length === (limit || PRODUCT_PER_PAGE));
        setHasPrev((searchParams?.page ? parseInt(searchParams.page) : 0) > 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, limit, searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products.map((product: Product) => (
        <Link
          href={"/" + product.id}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product.id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.image || "/product.png"}
              alt={product.name}
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price}</span>
          </div>
          {product.desc && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.desc),
              }}
            ></div>
          )}
          <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
      {(searchParams?.cat || searchParams?.name) && (
        <Pagination
          currentPage={currentPage}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}
    </div>
  );
};

export default ProductList;
