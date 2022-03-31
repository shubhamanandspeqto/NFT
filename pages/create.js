import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router';
import { render } from 'react-dom';
import Header from '../components/Header'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useWeb3 } from '@3rdweb/hooks'
import { ethers } from "ethers";
import { client } from '../lib/sanityClient'
import toast, { Toaster } from 'react-hot-toast'

// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';


export default function CreateItem() {
    const toAddress = "0x69e56D0aF44380BC3B0D666c4207BBF910f0ADC9";
    const { provider } = useWeb3()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const router = useRouter();
    const sucessNotify = () => toast.success("Sucess!");


    const fetchCollectionData = async (sanityClient = client) => {
        const query = `*[_type == "marketItems" && contractAddress == "0x00B70C4aD93336E92eA0517fCA3aC0D0Fd5f5e10" ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`
        const collectionData = await sanityClient.fetch(query)

        console.log(collectionData, '🔥------------')
        let contractDataAddress = collectionData[0].contractAddress
        let contractDataAddress1 = collectionData
        console.log(contractDataAddress, "contractAddresvfs-------------")
        console.log(contractDataAddress1, "contractAddresvfs-------------")
        // the query returns 1 object inside of an array
        // await setCollection(collectionData[0])



    }

    useEffect(() => {
        fetchCollectionData()

    }, [])

    const handleChange1 = event => {
        setName(event.target.value);

    }
    const handleChange2 = event => {
        setDescription(event.target.value);
    }
    const handleChange3 = event => {
        setPrice(event.target.value);
    }
    const handleChange4 = e => {
        let data = e.target.files[0]
        setImage(data)
    }

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const confirmPurchase = (toastHandler = toast) =>
        toastHandler.success(`Created successful!`, {
            style: {
                background: '#04111d',
                color: '#fff',
            },
        })

    function onSubmit(event) {
        event.preventDefault()
        
        let data = {
            name: name,
            description: description,
            price: price,
            image: image,
        }

        // console.log(data)
        const rpcUrl = "rinkeby";
        const wallet = new ethers.Wallet(
            "8f485f65c6efba9bcb5419d0f6283cec90b3e753772d8c0457954306e10edf90",
            ethers.getDefaultProvider(rpcUrl)
        );
        const nft = new ThirdwebSDK(wallet).getNFTModule(
            "0x00B70C4aD93336E92eA0517fCA3aC0D0Fd5f5e10"
        );
        nft.mintTo(toAddress, data).then(data=>{
          sucessNotify()
             router.push('/')

        }).catch(err =>{
            alert("got an error")
        })
        // sucessNotify()
        // console.log("fdfdfdfdfs")
        // setTimeout(() => {
        //     router.push('/')

        // }, 3000);
        // console.log(tx, "tx--------------------");
    }



    return (
        <>
            <Header />
            <form onSubmit={onSubmit} id="form1">
                <div className="flex justify-center">
                    <div className="w-1/2 flex flex-col pb-12">
                        <input
                            placeholder="Asset Name"
                            className="mt-8 border rounded p-4"
                            name="name"
                            value={name}
                            onChange={handleChange1}
                            required
                        />

                        <textarea
                            placeholder="Asset Description"
                            className="mt-2 border rounded p-4"
                            name="description"
                            value={description}
                            onChange={handleChange2}
                            required
                       

                        />
                        <input
                            placeholder="Asset Price in Eth"
                            className="mt-2 border rounded p-4"
                            name="price"
                            value={price}
                            onChange={handleChange3}
                            required
                       
                        />

                        <input
                            type="file"
                            name="Asset"
                            className="my-4"
                            accept="image/*"
                            name="image"
                            defaultValue={image}
                            onChange={handleChange4}
                            required
                        />
                        {/* {
                            fileUrl && (
                                <img className="rounded mt-4" width="350" src={fileUrl} />
                            )
                        } */}
                        <button type="submit" className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                            Create NFT
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}