/* eslint-disable react/prop-types */
import React from "react";

const TransactionItem = ({ item, index, setItem }) => {

  
  const onDelete = (ID) => {
    // const newArray = itens.filter((transaction) => transaction.id !== ID);
    // setItens(newArray);
    // localStorage.setItem('transactions', JSON.stringify(newArray));
    
    let array = JSON.parse(localStorage.getItem('transactions'))
    array.splice(array.map((item) => item.id).indexOf(ID), 1);
    localStorage.setItem('transactions', JSON.stringify(array))
    setItem(array)
    
  }
  return (
    <div >
      {item.expense ? (
        <div key={index} className="group w-full rounded-lg max-h-[60px] bg-[#8b79d990] p-2 flex flex-row duration-[.5s]  hover:scale-[1.02] hover:bg--300 hover:bg-red-400 my-1">
          <div className="flex flex-row p-2 h-full w-[45%]">
            <i className="ph-arrow-fat-lines-down ph-thin ph-bold text-red-500 text-[1.8rem] pr-3 group-hover:text-black transition-[.3s] "></i>
            <div className="w-full">
              <p className="text-[18px] max-w-[300px] whitespace-nowrap overflow-hidden text-ellipsis ">
                {item.desc}
              </p>
            </div>
          </div>
          <div className=" w-[55%] h-full flex flex-row items-center justify-between pr-3">
            <p className="ml-3 font-bold text-[1.5rem] max-w-[300px] text-black whitespace-nowrap overflow-hidden text-ellipsis w-[200px]">
              {`R$ ${item.amount}`}
            </p>
            <p>
              {item.date}
            </p>
            <button onClick={(e) => {onDelete(item.id); e.target.value}} className="p-1 group/button mt-[3px]">
              <i id="trash" className="ph-trash-simple ph-bold text-[25px] transition-[.3s] group-hover/button:text-white"></i>
            </button>
          </div>
        </div>
      ) : (
        <div key={index} className="group w-full rounded-lg max-h-[60px] bg-[#8b79d990] p-2 flex flex-row duration-[.5s]  hover:scale-[1.02] hover:bg-green-300  my-1">
          <div className="flex flex-row p-2 h-full w-[45%]">
            <i className="ph-arrow-fat-lines-up ph-thin ph-bold text-green-300 text-[1.8rem] pr-3 group-hover:text-black transition-[.3s]"></i>
            <div className="w-full">
              <p className="text-[18px] max-w-[300px] whitespace-nowrap overflow-hidden text-ellipsis ">
                {item.desc}
              </p>
            </div>
          </div>

          <div className="  w-[55%] h-full flex flex-row items-center justify-between pr-3">
            <p className="ml-3 font-bold text-[1.5rem] max-w-[200px] text-black whitespace-nowrap overflow-hidden text-ellipsis w-[200px]">
              {`R$ ${item.amount}`}
            </p>
            <p>
              {item.date}
            </p>
            <button onClick={(e) => {onDelete(item.id); e.target.value;}} className="p-1 group/button mt-[3px]">
              <i id="trash" className="ph-trash-simple ph-bold text-[25px] transition-[.3s] group-hover/button:text-white"></i>
            </button>
          </div>
        </div>
      )}
    </div>

    /*
      <div className="group w-full rounded-lg max-h-[60px] bg-[#8b79d990] p-2 flex flex-row duration-[.5s]  hover:scale-[1.02] hover:bg--300 hover:bg-red-400 my-1">
        <div className='flex flex-row p-2 h-full w-[60%]'>
            <i className='ph-arrow-fat-lines-down ph-thin ph-bold text-red-500 text-[1.8rem] pr-3 group-hover:text-black transition-[.3s] '></i>     
            <div className='w-full'>
                <p className='text-[18px] max-w-[300px] whitespace-nowrap overflow-hidden text-ellipsis '>Description</p>
            </div>
        </div>

        <div className=' w-[40%] h-full flex flex-row items-center justify-between pr-3'>
          <p className='ml-3 font-bold text-[1.5rem] text-black'>2000</p>
          <button className="p-1 group/button">
            <i id="trash" className='ph-trash-simple ph-bold text-[25px] transition-[.3s] group-hover/button:text-white'></i>
          </button>
        </div>
      </div> */
  );
};

export default TransactionItem;
