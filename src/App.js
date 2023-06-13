import './App.css';
import Button from 'react-bootstrap/Button';
import React,{ useState,useRef,useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import FormExample from './Form';
// import firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDNRAAak5LVdTKJuZqgYD8YUJsuDnxSjlA",
  authDomain: "chromeextension-c0ab5.firebaseapp.com",
  projectId: "chromeextension-c0ab5",
  storageBucket: "chromeextension-c0ab5.appspot.com",
  messagingSenderId: "703595821867",
  appId: "1:703595821867:web:b6b0772c2c5158c6d2a36e"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
 

const localStorageKey = 'appData';
function App() {



  const [data, setData] = useState([
    {
      name: `search`,
      options:[
        {op:"google",url:"https://www.google.com",logo:"https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_640.png"},
        {op:"DuckDuckGo",url:"https://duckduckgo.com/",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTGni8jI4TNDFSFi-VhDLms4F_hFXQSVl_bw&usqp=CAU"},
        {op:"bing",url:"https://www.bing.com",logo:"https://cdn.pixabay.com/photo/2015/07/13/07/30/icons-842847_640.png"},
        {op:"Yandex",url:"https://yandex.com/",logo:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTo7_7rJ8IhbzDJ7El-4t-z260lvmvl72U_1OfxHCCRuaTZwofe"},
        {op:"Yahoo",url:"https://www.yahoo.com",logo:"https://cdn.pixabay.com/photo/2013/01/29/22/53/yahoo-76684_1280.png"},
        {op:"ChatGPT",url:"https://chat.openai.com/",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGOHTPofX_5KQ0e7cAoWr6OkteSqkK-Ci68A&usqp=CAU"},
      ],
      url:["https://www.google.com","https://www.bing.com"]
    },
    
    {
      name: `code`,
      options:[
        {op:"leetcode",url:"https://www.leetcode.com",logo:"https://w7.pngwing.com/pngs/640/947/png-transparent-leetcode-button-icon-thumbnail.png"},
        {op:"codechef",url:"https://www.codechef.com/",logo:"https://w7.pngwing.com/pngs/20/941/png-transparent-codechef-button-icon-thumbnail.png"},
        {op:"codeforces",url:"https://www.codeforces.com/",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LVEIg_6x2wqlPG8pruOUnUi-wEvnw1eC0w&usqp=CAU"},
        {op:"geeksforgeeks",url:"https://www.geeksforgeeks.org/",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTumkJyusIue4P0t4SH24VbFe0zpPa3Oop0Fw&usqp=CAU"},
        {op:"hakerrank",url:"https://www.hackerrank.com/",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5T8AkQTISDqwAKZgFbqn6rHtleVrAZE20LA&usqp=CAU"},
        {op:"hakerearth",url:"https://www.hackerearth.com/",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwkglhlcJw_C5M4GZDaFK8WGMXC5QLRHW6gQ&usqp=CAU"},
        {op:"interviewBit",url:"https://www.interviewbit.com",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgRsxOmQC_EyLIWfURZpoE5cjng0NekigPmQ&usqp=CAU"},
        {op:"coderbyte",url:"https://www.coderbyte.com",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzLOL1gcGPty5N7Ra6MoSsWtXzR-3n42WG8w&usqp=CAU"},
      ],
      url:["https://www.leetcode.com","https://www.neetcode.com"]
    },
    {
      name: `shop`,
      options:[
        {op:"amazon",url:"https://www.amazon.com",logo:"https://w7.pngwing.com/pngs/1012/770/png-transparent-amazon-logo-amazon-com-amazon-video-logo-company-brand-amazon-logo-miscellaneous-wish-text-thumbnail.png"},
        {op:"myntra",url:"https://www.myntra.com",logo:"https://w7.pngwing.com/pngs/887/617/png-transparent-myntra-logo-e-commerce-flipkart-shop-and-win-text-discounts-and-allowances-shut-down-thumbnail.png"},
        {op:"Ajio",url:"https://www.ajio.com",logo:"https://w7.pngwing.com/pngs/956/745/png-transparent-couponcode-online-shopping-amazon-com-elon-musk-text-trademark-logo-thumbnail.png"},
        {op:"ebay",url:"https://www.ebay.com",logo:"https://w7.pngwing.com/pngs/325/220/png-transparent-ebay-logo-ebay-online-shopping-amazon-com-sales-ebay-logo-text-logo-donation-thumbnail.png"},
        {op:"flipkart",url:"https://flipkart.com",logo:"https://w7.pngwing.com/pngs/5/879/png-transparent-flipkart-e-commerce-vu-televisions-sales-gmail-logo-blue-text-public-relations-thumbnail.png"},
        {op:"Meesho",url:"https://meesho.com",logo:"https://w7.pngwing.com/pngs/39/808/png-transparent-meesho-whatsapp-google-play-whatsapp-text-logo-information-technology-thumbnail.png"},
        {op:"Nykka",url:"https://www.nykaa.com/",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYU5yXPPA3jcq9Pyebvqu8ksitkbwk0mdptg&usqp=CAU"},
        {op:"purplle",url:"https://purplle.com",logo:"https://w7.pngwing.com/pngs/927/126/png-transparent-purplle-1-hd-logo-thumbnail.png"},
        {op:"snapdeal",url:"https://snapdeal.com",logo:"https://w7.pngwing.com/pngs/505/66/png-transparent-snapdeal-logo-thumbnail.png"},
      ],
      url:["https://www.amazon.com","https://www.flipkart.com"]
    }
  ]);








  ////////////
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [toggle,setToggle] = useState(false);



  // Load data from local storage when the page loads
  useEffect(() => {
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

    // Save data to local storage whenever it changes
    useEffect(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    }, [data]);



  ///form and clickoutsite
  const formRef = useRef(null);
  const [add,setAdd]=useState(false);
  const handleAdd=()=>{
    setAdd(!add);
  }
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setAdd(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
//////formclose




  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
    setSelectedOption(null);
    setToggle(!toggle);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    window.open(option.url, '_blank');
  };

//////////form submit 


const handleFormSubmit = async (formData,form,setValidated) => {
  const { op, url, logo } = formData;

  const newOption = {
    op,
    url,
    logo,
  };

  const updatedData = data.map((item, index) => {
    if (selectedCategory === index) {
      return {
        ...item,
        options: [...item.options, newOption],
      };
    }
    return item;
  });

  setData(updatedData);
  setAdd(false);
  try {
    // Save the form data to Firestore
    await db.collection('categories').doc(selectedCategory.toString()).collection('items').add({
      op,
      url,
      logo,
    });
    
    // Reset the form
    form.reset();
    setValidated(false);
  } catch (error) {
    console.error('Error saving data:', error);
  }
  // Save the updated data to local storage
  localStorage.setItem('data', JSON.stringify(updatedData));
};




// const handleFormSubmit = async (formData,form,setValidated) => {
//   const { op, url, logo } = formData;
//   const isValidUrl = /^https?:\/\/.+/i.test(url);
  
//   if (!isValidUrl) {
//     alert('Please provide a valid URL starting with http:// or https://');
//     return;
//   }
  
//   try {
//     // Save the form data to Firestore
//     await db.collection('categories').doc(selectedCategory.toString()).collection('items').add({
//       op,
//       url,
//       logo,
//     });
    
//     // Reset the form
//     form.reset();
//     setValidated(false);
//   } catch (error) {
//     console.error('Error saving data:', error);
//   }
// };


useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch the data from Firestore
      const snapshot = await db.collection('categories').get();

      // Transform the data to an array
      const data = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const itemsSnapshot = await doc.ref.collection('items').get();
          const items = itemsSnapshot.docs.map((itemDoc) => itemDoc.data());
          return {
            name: doc.id,
            options: items,
          };
        })
      );

      // Update the state
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);
//////////////


  return (
    <div className="App" >
      {/* <h2>Choose an app category:</h2> */}
      <div className="applist">
        {data.map((item, index) => (
          <div className="main" key={item.name}>
            <Button key={index} onClick={() => handleCategoryClick(index)}  variant={selectedCategory === index ? 'primary' : 'secondary'}>
              {item.name}
            </Button>
            </div>
        ))}
      </div>

            {/* if category selected display resp cards  */}
            {selectedCategory !== null && (
              <div className='listopt'>
                {data[selectedCategory].options.map((option, optionIndex) => (
                 
                  ///card
                  <Card key={optionIndex} style={{ width: '18rem' }} onClick={() => handleOptionClick(option)}>
                  <Card.Body>
                  <Card.Img variant="top" src={option.logo} />
                    <Card.Title>{option.op}</Card.Title>                   
                  </Card.Body>
                </Card>
                
                ))}

                {/* add a new card  */}
                 <Card style={{ width: '18rem' }} onClick={handleAdd}>
                  <Card.Body>
                  <Card.Img variant="top" class="addmore"src="https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_640.png" />
                  </Card.Body>
                </Card>

{add && (
        <div className="formadd"ref={formRef}>
          <FormExample onSubmit={handleFormSubmit}/>
          </div>
          )}    

              </div>
              
            )}
    
            </div>
      
  );
}

export default App;
