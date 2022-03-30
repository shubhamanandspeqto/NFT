import { useState ,useEffect, useMemo  } from 'react'
import { render } from 'react-dom';
import Header from '../components/Header'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../lib/sanityClient'

export default function CreateItem() {
    const toAddress = "0x69e56D0aF44380BC3B0D666c4207BBF910f0ADC9";
    const { provider } = useWeb3()

    const[name,setName] = useState("")
    const[description,setDescription] = useState("")
    const[price,setPrice] = useState("")

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
    console.log(contractDataAddress,"contractAddresvfs-------------")
    // the query returns 1 object inside of an array
    await setCollection(collectionData[0])
   
}
    useEffect(() => {
        fetchCollectionData()
      }, [])
    
    // const sdk = new ThirdwebSDK();
    // console.log(sdk.event,"ThirdwebSDK------------");
    // const a = new ThirdwebSDK.
    // console.log(a,"---------------a")
    // const metadata = {
    //     name: "Cool NFT",
    //     description: "This is a cool NFT",
    //     image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
    // };
    const handleChange1 = event => {
        setName(event.target.value);
       
    }
    const handleChange2 = event => {
        setDescription(event.target.value);
    }
    const handleChange3 = event => {
        setPrice(event.target.value);
    }
    // const handleChange4 = event => {
    //     setImage(event.target.value);
    // }

    const onChange = (event) => {
        setValue(event.target.value);
    };
    // const nftModule = useMemo(() => {
    //     if (!provider) return
    
    //     const sdk = new ThirdwebSDK(
    //       provider.getSigner()
    //       // 'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
    //       // 'https://eth-rinkeby.alchemyapi.io/v2/WoQ58XHoFbpSlyw4VAVpJF9YpkMuYwKg'
    //     )
    //     return sdk.getNFTModule('0x00B70C4aD93336E92eA0517fCA3aC0D0Fd5f5e10')
    //   }, [provider])
    
    //   // get all NFTs in the collection
    //   useEffect(() => {
    //     if (!nftModule) return
    //     ;(async () => {
    //       const nfts = await nftModule.getAll()
    
    //       setNfts(nfts)
    //     })()
    //   }, [nftModule])

    function onSubmit(event) {
        event.preventDefault()
    //     const sdk = new ThirdwebSDK()
    // return sdk.contract('0x00B70C4aD93336E92eA0517fCA3aC0D0Fd5f5e10');
        // let reader = new FileReader()
        // let imagedata = reader.readAsDataURL(image)
        let data = {
            name:name,
            description: description,
            price: price,
            // image:imagedata,
        }

        // debugger
        console.log(data)
     let ts =  sdk.getNFTModule(toAddress, data);
     console.log(ts,"=------------------------");
        }
        
        
    // const tx = await contract.mintTo(toAddress, metadata);

    return (
        <>
            <Header />
            <form onSubmit={onSubmit} id="form1">
                <div className="flex justify-center">
                    <div className="w-1/2 flex flex-col pb-12">
                        <input
                            placeholder="Asset Name"
                            className="mt-8 border rounded p-4"
                            name= "name"
                            value={name}
                            onChange={handleChange1}
                        
                        />
                        <textarea
                            placeholder="Asset Description"
                            className="mt-2 border rounded p-4"
                            name= "description"
                            value={description}
                            onChange={handleChange2}
                            
                        />
                        <input
                            placeholder="Asset Price in Eth"
                            className="mt-2 border rounded p-4"
                            name= "price"
                            value={price}
                            onChange={handleChange3}
                            
                        />

                        {/* <input
                            type="file"
                            name="Asset"
                            className="my-4"
                            name= "image"
                            value={image}
                            onChange={handleChange4}
                            // value={values.image}
                            // onChange={set('image')}
                        /> */}
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