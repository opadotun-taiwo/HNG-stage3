"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import galleryList from '@/data';
import Footer from './components/Footer';
import { Audio } from  'react-loader-spinner'

interface ImageData {
  img: string;
  title: string;
  id: number;
  tags: string[];
}

const Card = ({ src, title, id, index }: any) => {
  return (
    <div className="flex justify-center">
      <img src={src} alt={title} />
    </div>
  );
};

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading images from an API or source
    setTimeout(() => {
      setImages(galleryList);
      setIsLoading(false);
    }, 2000); // Simulated 2-second loading time
  }, []);

  const filteredImages = images.filter((image) =>
    image.tags.some((tag) => tag.includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full h-[100vh]">
      {isLoading ? (
        // Display a loading message or spinner while images are loading
        <div className='flex justify-center items-center w-[100%] mt-[250px]'>
        <Audio
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="audio-loading"
          wrapperStyle={{}}
          wrapperClass="wrapper-class"
          visible={true}
        />
        </div>
      ) : (
        <>
          <div className='bg-orange-600 h-[200px] flex flex-col justify-center items-center p-4'>
            <h3 className='text-[1.5em] text-white font-semibold p-4'>Rearrange these images</h3>
              {/* Search input */}
              <input
                type="text"
                className='w-[100%] md:w-[50%] h-[50px] p-4 rounded-xl outline-none'
                placeholder="Search by tag"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4 justify-center items-center'>
            {React.Children.toArray(
              filteredImages.map((image, index) => (
                <Card
                  src={image.img}
                  title={image.title}
                  id={image.id}
                  index={index}
                />
              ))
            )}
          </div>
           <Footer />
        </>
      )}
    </div>
  );
}
