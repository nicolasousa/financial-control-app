/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import './Scroll.css'
//import { Radio } from "@material-tailwind/react";
import Transactions from '../Transactions/Transactions'

const Controller = () => {

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState();
    const [dateF, setDateF] = useState();
    const [isExpense, setIsExpense] = useState(true); // declara se é entrada ou saída

    const generateID = () => Math.round(Math.random() * 1000); // gera um id aleatório

    const handleSave = () => {
        if (!description || !amount) {
            alert("Informe a Descrição e também o Valor");
            return;
        } else if (amount < 1) {
            alert("O valor tem que ser positivo");
            return;
        }

        const today = new Date();

        setDateF(today.toLocaleDateString());


        const transaction = {
            id: generateID(),
            desc: description,
            amount: amount,
            expense: isExpense,
            date: dateF,
        };

        handleAdd(transaction);

        setDescription('');
        setAmount('');
    }

    const data = localStorage.getItem('transactions');
    const [transactionsList, setTransactionsList] = useState(
        data ? JSON.parse(data) : []
    );

    // const [description, setDescription] = useState(0)    
    // const [amount, setAmount] = useState(0)    
    // const [listExpensive, setListExpensive] = useState(0)    


    const [income, setIncome] = useState(0); // entradas
    const [expense, setExpense] = useState(0); // saídas
    const [total, setTotal] = useState(0); // total

    useEffect(() => {
        // pegando as saídas
        const amountExpense = transactionsList.filter((item) => item.expense)
            .map((transaction) => Number(transaction.amount));

        // pegando as entradas 
        const amountIncome = transactionsList
            .filter((item) => !item.expense)
            .map((transaction) => Number(transaction.amount))

        // somando todas as entradas e saídas
        const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
        const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);

        const total = Math.abs(income - expense).toFixed(2);

        setIncome(income);
        setExpense(expense);
        setTotal(`${Number(income) < Number(expense) ? '-' : ''} ${total}`);

    }, [transactionsList]);

    const handleAdd = (transaction) => {
        const newArrayTransactions = [...transactionsList, transaction];

        setTransactionsList(newArrayTransactions);

        localStorage.setItem('transactions', JSON.stringify(newArrayTransactions));
    };


    return (
        <div className=''>
            <section className='p-[15px] bg-[var(--bg-color-2)] rounded-[8px] max-w-[1200px] flex flex-row m-auto mt-[20px] shadow-[var(--shadow)]'>
                <div className='bg-[var(--bg-color)] w-[400px] h-[var(--container-height)] p-[15px] flex flex-col justify-around items-center rounded-[var(--border-radius)]'>
                    <div className='group/box flex flex-col bg-[#b3beff7c] hover:bg-[#aad576] items-center w-[300px] h-[200px] m-[5px] p-[8px] rounded-[8px] transition-all' id='box-entry'>
                        <p className='text-lg font-bold group-hover/box:text-white' >
                            Entradas <i className="ph-bold ph-arrow-circle-up text-[20px]" id='entry-icon'></i>
                        </p>
                        <p className='group-hover/box:translate-y-[0.5rem] max-w-[270px] text-white font-bold font-[Verdana] text-[2rem] transition-[.5s] whitespace-nowrap overflow-hidden text-ellipsis' id='entry-value'>{income}</p>
                    </div>
                    <div className='group/box flex flex-col bg-[#b3beff7c] hover:bg-[#e640409c] items-center w-[300px] h-[200px] m-[5px] p-[8px] rounded-[8px] transition-all' id='box-outs'>
                        <p className='text-lg font-bold transition-[.3s] group-hover/box:text-white'>
                            Saídas <i className="ph-bold ph-arrow-circle-down-right text-[20px]" id='outs-icon'></i>
                        </p>
                        <p className='group-hover/box:translate-y-[0.5rem] max-w-[270px] text-white font-bold font-[Verdana] text-[2rem] transition-[.5s] whitespace-nowrap overflow-hidden text-ellipsis' id='out-value'>{expense}</p>
                    </div>
                    <div className='group/box flex flex-col bg-[#b3beff7c] hover:bg-[#8696ed] items-center w-[300px] h-[200px] m-[5px] p-[8px] rounded-[8px] transition-all' id='box-all'>
                        <p className='text-lg font-bold group-hover/box:text-white'>
                            Total <i className="ph-bold ph-files text-[20px]"></i>
                        </p>
                        <p className='group-hover/box:translate-y-[0.5rem] max-w-[270px] text-white font-bold font-[Verdana] text-[1.75rem] transition-[.5s] whitespace-nowrap overflow-x-scroll ' id='total-value'>{total}</p>
                    </div>
                </div>

                <div className='w-full ml-[10px]'>
                    <div className='w-full h-[54px] bg-[var(--bg-color)] p-[5px] flex flex-row justify-around rounded-[8px] items-center'>
                        <input type="text" className='text-center border-2 border-[#b3beff7c] rounded-[2px] outline-none transition-[.4s ease-in-out] focus:border-[var(--bg-color-2)]' id="input-description" placeholder='Descrição'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className='flex gap-10 items-center'>
                            <div className="flex items-center pl-[7px] pr-[7px] h-full m-[2px] rounded-[8px]" id='radio-item-entry'>
                                <input id="radio-entry" type="radio" value="entry" name="bordered-radio" className="peer/radio w-4 h-4 text-violet-500 bg-gray-100 border-gray-300 focus:ring-violet-800 dark:focus:ring-violet-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={() => setIsExpense(false)} />
                                <label htmlFor="radio-entry" className="peer-checked/radio:text-green-500 w-full p-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-950">Entrada</label>
                            </div>
                            <div className="flex items-center pl-[7px] pr-[7px] h-full m-[2px] rounded-[8px]" id='radio-item-out'>
                                <input id="radio-out" type="radio" value="out" name="bordered-radio" className="peer/radio w-4 h-4 text-violet-500 bg-gray-100 border-gray-300 focus:ring-violet-800 dark:focus:ring-violet-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={() => setIsExpense(true)} />
                                <label htmlFor="radio-out" className="peer-checked/radio:text-red-500 w-full p-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-950">Saída</label>
                            </div>
                        </div>
                        <input type="number" className='text-center border-2 border-[#b3beff7c] rounded-[2px] outline-none transition-[.4s ease-in-out] focus:border-[var(--bg-color-2)]' id="input-value" placeholder='Valor'
                            value={amount} onChange={(e) => setAmount(e.target.value)}
                        />
                        <div className="button__add-transaction">
                            <button onClick={handleSave} className='bg-[#8b79d9] p-1 px-3 rounded transition-all hover:scale-[1.05] hover:bg-violet-500 '>
                                Adicionar <i className="ph-bold ph-plus" id='add-icon'></i>
                            </button>
                            {/* <button className='button-add-transaction'>
                            Adicionar <i className="ph-bold ph-plus" id='add-icon'></i>
                        </button> */}
                        </div>
                    </div>

                    <div className='mt-1 bg-[var(--bg-color)] w-full h-[465px] rounded-[var(--border-radius)] p-[1rem] flex flex-col overflow-y-scroll' id='container__transactions'>
                        <Transactions itens={transactionsList} setItens={setTransactionsList} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Controller