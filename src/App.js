
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
      name: `seach engines`,
      options:[
        {op:"google",url:"https://www.google.com",logo:"https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_640.png"},
        {op:"google",url:"https://www.google.com",logo:"https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_640.png"},
        {op:"google",url:"https://www.google.com",logo:"https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_640.png"},
        {op:"bing",url:"https://www.bing.com",logo:"https://cdn.pixabay.com/photo/2015/07/13/07/30/icons-842847_640.png"},
        {op:"bing",url:"https://www.bing.com",logo:"https://cdn.pixabay.com/photo/2015/07/13/07/30/icons-842847_640.png"},
        {op:"bing",url:"https://www.bing.com",logo:"https://cdn.pixabay.com/photo/2015/07/13/07/30/icons-842847_640.png"},
        {op:"bing",url:"https://www.bing.com",logo:"https://cdn.pixabay.com/photo/2015/07/13/07/30/icons-842847_640.png"},
      ],
      url:["https://www.google.com","https://www.bing.com"]
    },
    {
      name: `shop`,
      options:[
        {op:"amazon",url:"https://www.amazon.com"},
        {op:"amazon",url:"https://www.amazon.com"},
        {op:"amazon",url:"https://www.amazon.com"},
        {op:"amazon",url:"https://www.amazon.com"},
        {op:"flipkart",url:"https://flipkart.com"},
        {op:"flipkart",url:"https://flipkart.com"},
        {op:"flipkart",url:"https://flipkart.com"},
        {op:"flipkart",url:"https://flipkart.com"},
        {op:"flipkart",url:"https://flipkart.com"},
      ],
      url:["https://www.amazon.com","https://www.flipkart.com"]
    },
    {
      name: `study`,
      options:[
        {op:"leetcode",url:"https://www.leetcode.com.com",logo:"https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_640.png"},
        {op:"leetcode",url:"https://www.leetcode.com.com"},
        {op:"leetcode",url:"https://www.leetcode.com.com"},
        {op:"hakerrank",url:"https://www.hakerrank.com"},
        {op:"hakerrank",url:"https://www.hakerrank.com"},
        {op:"hakerrank",url:"https://www.hakerrank.com"},
        {op:"hakerrank",url:"https://www.hakerrank.com"},
        {op:"hakerrank",url:"https://www.hakerrank.com"},
      ],
      url:["https://www.leetcode.com","https://www.neetcode.com"]
    }
  ]);










  ////////////
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [toggle,setToggle] = useState(false);


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

const [jsonData, setJsonData] = useState(data);

useEffect(() => {
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    setData(JSON.parse(storedData));
  }
}, []);
useEffect(() => {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
}, [data]);


const handleFormSubmit = (formData) => {
  const { name, url, logo } = formData;

  const newOption = {
    op: name,
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

  // Save the updated data to local storage
  localStorage.setItem('data', JSON.stringify(updatedData));
};




// const handleFormSubmit = async (formData,form,setValidated) => {
//   const { name, url, logo } = formData;
//   const isValidUrl = /^https?:\/\/.+/i.test(url);
//   if (!isValidUrl) {
//     alert('Please provide a valid URL starting with http:// or https://');
//     return;
//   }
//   try {
//     // Save the form data to Firestore
//     await db.collection('cards').add({
//       name,
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
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       // Fetch the data from Firestore
//       const snapshot = await db.collection('cards').get();

//       // Transform the data to an array
//       const data = snapshot.docs.map((doc) => doc.data());

//       // Update the state
//       setData(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchData();
// }, []);
//////////////


  return (
    <div className="App" >
      <h2>Choose an app category:</h2>
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
                  <Card style={{ width: '18rem' }} onClick={() => handleOptionClick(option)}>
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
