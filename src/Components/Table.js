import React, { Children, useEffect, useState } from 'react';
import { Select, Table } from '@mantine/core';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { Button, Modal,Input } from '@mantine/core';
import {yupResolver} from '@hookform/resolvers/yup'
import { db } from '../firebaseConfig';
import { Box } from '@mantine/core';
import { CheckCircle } from 'react-bootstrap-icons';
import { Alert } from '@mantine/core';
import {useSelector} from "react-redux"
// import { IconAlertCircle } from '@tabler/icons-react';
import { set, useForm } from 'react-hook-form';
import { Textarea } from '@mantine/core';
import { Pencil } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';
import {PinAngle} from 'react-bootstrap-icons'
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import axios from "axios"
import './Table.css'
import { v4 as uuidv4 } from 'uuid';
import * as yup from "yup"
import { ExclamationTriangle } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { getDocs,collection,addDoc,deleteDoc,doc, updateDoc } from 'firebase/firestore';
var change = ""
export default function TableList() {
  const [modalOpened, setModalOpened] = useState(false);
  const [editId,setEditId] = useState("")
  const [parentId,setParentId] = useState("")
  const [addmodalOpened, setAddModalOpened] = useState(false);
  const [addChildmodalOpened, setAddChildModalOpened] = useState(false);
  const [editmodalOpened, setEditModalOpened] = useState(false);
  const [position,setPositions] = useState([])
  const [update,setUpdate] = useState(true)
 const [editChildModal,setEditChildModalOpened] = useState(false)
 const [editName,setEditName] = useState("")
  const handleAddModal = () => {
    setAddModalOpened((prev) => !prev);
  };
  const handleAddChildModal = () => {
    setAddChildModalOpened((prev) => !prev);
  };
  const handleEditModal2 = (positionId) => {
    setEditModalOpened((prev) => !prev);
    setEditId(positionId)
  } 
  const handleEditModal = () => {
    setEditModalOpened((prev) => !prev);

  };
  const handleEditChildModal = () => {
    setEditChildModalOpened((prev) => !prev);

  };
  const handleEditChildModal2 = (positionName,id,parentId) => {
    setEditChildModalOpened((prev) => !prev);
    setEditName(positionName)
    setEditId(id)
    setParentId(parentId)
  };

  useEffect(() => {
    axios.get("http://localhost:3030/parent/0").then((res)=>setPositions(res.data.position))
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3030/parent/0").then((res)=>setPositions(res.data.position))
  }, [update]);
  const color = useSelector((state)=>state.language.value2)
  const language = useSelector((state)=>state.language.value)
  const deleteChild = async (func, parentId, position, id) => {
    try {
      const response = await axios.get("http://localhost:3030/parent/0");
      const rawData = response.data.position;
      var deleted = 0;
  
      async function deleteTarget(parentId, data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].parentId === parentId) {
            if (data[i].children.length > 0) {
              setShowAlert(true);
              return data;
            } else {
              // Filter out the child with the specified ID
              var newData = data.filter((item) => item.id !== id);
              setShowAlert2(true);
              return newData; // Return the modified data after filtering
            }
          } else if (data[i].id === parentId) {
            data[i].children.forEach((child) => {
              if (child.position === position) {
                if (child.children.length > 0) {
                  setShowAlert(true);
                  deleted = 1;
                }
              }
            });
            if (deleted === 0) {
              data[i].children = data[i].children.filter(
                (child) => child.position !== position
              );
              setShowAlert2(true);
            }
            return data;
          } else if (data[i].children && data[i].children.length > 0) {
            data[i].children = await deleteTarget(parentId, data[i].children);
          }
        }
        return data;
      }
  
      const updatedData = await deleteTarget(parentId, rawData);
  
      await axios.put("http://localhost:3030/parent/0", {
        position: updatedData,
      });
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    func((prev) => !prev);
  };
  
  const renderTree = (data) => {
    return data.map((node) => (
      <TreeItem key={node.position} nodeId={node.position} label={node.position}> 
        <div>
          <span style={{color:"#36b036"}}>{language=="english"?"Description:":"መግለጫ፦"}</span>{node.description} <><Button  onClick={()=>{handleEditChildModal2(node.position,node.id,node.parentId)}} variant="light" color='blue' size={18} style={{margin:"10px"}}><Pencil/></Button>
        <Button variant='light' color='red' size={18} onClick={()=>{deleteChild(setUpdate,node.parentId, node.position,node.id)}}><Trash/></Button></>
        </div>
        
        {Array.isArray(node.children) ? renderTree(node.children,0) : null}
      </TreeItem>
    ));
  };
const deletes = async(id,func)=>
{
  try{
    const response = await axios.get("http://localhost:3030/parent/0");
    var rawData = response.data.position; 
    var newData = rawData.filter((data)=>data.id!=id)
    await axios.put("http://localhost:3030/parent/0",{
      position:newData
    } )
  }
  catch(error){
    console.log(error)
  }

func((prev)=>!prev)
alert("Root Node has been deleted successfully!")
}
const [searchTerm, setSearchTerm] = useState('');
const renderSearch = (data,searchTerm) => {
  var storage = []
  function store(data){data.map((item) => {
    var childs = item.children.length 
    
        storage.push({
          position:item.position,
          description:item.description,
          id:item.id,
          parentId:item.parentId,
          childs:childs

        })
          
        {item.children && item.children.length > 0 && store(item.children)}
  });
}
store(data)
const final = storage.filter((val)=>{
  if(val.position.toLowerCase().includes(searchTerm.toLowerCase())){
    return val
  }
}).map((data)=>{
  return ( 
      <tr key={data.id}>
        <td>{data.position}</td>
        <td>{data.description}</td>
        <td>{data.id}</td>
        <td>{data.parentId}</td>
        <td>{data.childs}</td>
      </tr>
    
  );
})
return final

}
const renderTable = (data) => {
  return data.map((item) => {
    var childs = item.children.length 
    return (
      <>
        <tr>
            <td style={{color:color=='light'?'black':"#d9d9d9"}}>{item.position}</td>
            <td style={{color:color=='light'?'black':"#d9d9d9"}}>{item.description}</td>
            <td style={{color:color=='light'?'black':"#d9d9d9"}}>{item.id}</td>
            <td style={{color:color=='light'?'black':"#d9d9d9"}}>{item.parentId}</td>
            <td style={{color:color=='light'?'black':"#d9d9d9"}}>{childs}</td>
          </tr>
        {item.children && item.children.length > 0 && renderTable(item.children)}
      </>
    );
  });
}
var hasRoot = false
if(position.length>0){
hasRoot = true
}
const [showAlert,setShowAlert] = useState(false)
const [showAlert2,setShowAlert2] = useState(false)
const message = <p className='text-red-600 font-bold text-xl'> <ExclamationTriangle size={20} color='red'/>Deletion Failed!
</p>
const message2 = <p className='text-green-600 font-bold text-xl'> <CheckCircle size={20} color='green'/>Deletion Succeeded!
</p>
  return (
    <>
    <Box id="Root" maw={1000} style={{margin:"0 auto",marginTop:"50px"}}>
      <h1  style={{width:"290px",height:"70px",position:"absolute",zIndex:"5",marginLeft:"15px"}}>Positions</h1>
<h1 style={{textAlign:"center",background:"lightgreen",padding:"40px",opacity:"0.4",borderRadius:"40px"}}></h1>
    <button className='bg-sky-500 text-white p-2 rounded-lg mb-1 hover:bg-sky-400 disabled:bg-slate-400' style={{marginLeft:"100px",marginTop:"20px"}} onClick={handleAddModal} disabled={hasRoot}>{language=="english"?"Add Root +":"Root Node ጨምር"}</button>
    <input className='placeholder-slate-600 outline-sky-300 bg-green-200 text-black w-60 p-2 border-none rounded-xl float-right mt-3 mr-24'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}></input>
     <Table maw={800} bgcolor={color=='light'?'white':'#666666'}  style={{ margin: '0 auto'}} highlightOnHover withColumnBorders>      
        <thead>
        
          <tr >
            <th style={{color:color=='light'?'black':"#d9d9d9"}}>{language=="amharic"?"ቦታ":"Position"}</th>
            <th style={{color:color=='light'?'black':"#d9d9d9"}}>{language=="amharic"?"መግለጫ":"Description"}</th>
            <th style={{color:color=='light'?'black':"#d9d9d9"}}>{language=="amharic"?"መለያ":"Id"}</th>
            <th style={{color:color=='light'?'black':"#d9d9d9"}}>{language=="amharic"?"Parent Id":"Parent Id"}</th>
            <th style={{color:color=='light'?'black':"#d9d9d9"}}>{language=="amharic"?" የልጅ ብዛት":"Number of Children"}</th>
          </tr>

        </thead>
        <tbody >
          {searchTerm==""?renderTable(position):renderSearch(position,searchTerm)}
        </tbody>
      </Table>    
    </Box>
      <Modal opened={addmodalOpened} onClose={handleAddModal} title="Position Form" overlayOpacity={0.6} >
        <AddForm   func={setUpdate} data={position} func2 = {handleAddModal}/>
      </Modal>
      <Modal opened={editmodalOpened} onClose={handleEditModal} title="Edit Form" overlayOpacity={0.6} >
       <EditForm id={editId} func={setUpdate} data={position}/>
      </Modal>
      <Modal opened={addChildmodalOpened} onClose={handleAddChildModal} title="Add Child Form" overlayOpacity={0.6} >
       <AddChildForm func={setUpdate} />
      </Modal>
      <Modal opened={editChildModal} onClose={handleEditChildModal} title="Edit Child Form" overlayOpacity={0.6} >
       <EditChild name={editName} id = {editId} func={setUpdate} parentId = {parentId} />
      </Modal>
      <Box id="sub" maw={1000} style={{margin:"0 auto" ,marginTop:"100px"}}>
      <h1  style={{width:"290px",height:"70px",position:"absolute",zIndex:"5",marginLeft:"15px"}}>Hierarchy</h1>
<h1 style={{textAlign:"center",background:"lightgreen",padding:"40px",opacity:"0.4",borderRadius:"40px"}}></h1>
    <button className='bg-green-500 p-2 rounded-lg text-white  hover:bg-green-400'  onClick={handleAddChildModal} >Add Children +</button>
        
        <TreeView
        style={{backgroundColor:color=="light"?"white":"#666666",color:color=="light"?"black":"#d9d9d9",width:"100%"}}
  className="custom-treeview"
  defaultCollapseIcon={<span>{<ChevronUp size={15}/>}</span>}
  defaultExpandIcon={<span>{<ChevronDown size={15}/>}</span>}
  defaultEndIcon={<span></span>}
>
{showAlert && (
        <Modal  className="" opened={showAlert} onClose={()=>{setShowAlert(false)}} title={message} overlayOpacity={1} >
       <p className='bg-red-100 p-10 text-red-700 text-center text-lg'>You can not delete this node as it has children!</p> 
       </Modal>
      )}
{showAlert2 && (
        <Modal  className="" opened={showAlert2} onClose={()=>{setShowAlert2(false)}} title={message2} overlayOpacity={1} >
       <p className='bg-green-100 p-10 text-green-700 text-center text-lg'>Position has been deleted successflly!</p> 
       </Modal>
)}
{renderTree(position,1)}
</TreeView>
    </Box>
    </>   
  );
}
const AddForm= ({func,func2})=>{
    const schema = yup.object().shape({
        position: yup.string().required("position is required!").min(2,"Position is too short!"),
        description:yup.string().required("description is required!").min(5,"Description is too short!"),
    })
    const {register, handleSubmit,formState:{errors}} = useForm({
        resolver:yupResolver(schema)
    });
    const [showAlert,setShowAlert] = useState(false);
    const handleShowAlert = ()=>{
        setShowAlert(true)
    }
    const onSubmit = async(data) => {
      try{
        const response = await axios.get("http://localhost:3030/parent/0");
        var rawData = response.data.position; 
        rawData = [...rawData,{
          id:uuidv4(),
          position: data.position,
          parentId:"None",
          description: data.description,
          children: [],
        }]
        await axios.put("http://localhost:3030/parent/0",{
          position:rawData
        } )
      }
      catch(error){
        console.log(error)
      }
      func((prev)=>!prev)
      func2((prev)=>!prev)   
    };
    const language = useSelector((state) => state.language.value);
    return<>
    <form onSubmit={handleSubmit(onSubmit)}>
        <label>{language=="amharic"?"ቦታ":"Position"}:</label>
        <Input type="text" placeholder="Position...." {...register("position")}></Input>
        <p style={{color:"white",width:"200px",color:"red"}}>{errors.position?.message}</p>
        <label>{language=="amharic"?"መግለጫ":"Description"}:</label>
        <Textarea {...register("description")} placeholder='Description....'></Textarea>
        <p style={{color:"white",width:"200px",color:"red"}}>{errors.description?.message}</p>
        <button className='bg-sky-500 p-2 rounded-lg text-white w-20 text-center hover:bg-sky-400' type='submit'>{language=="amharic"?"ጨምር":"Add"}</button>
        {showAlert && <Alert  title={language=="amharic"?"ተሳክቷል!":"Success!"} color="green">
     
      {language=="amharic"?" ቦታው በተሳካ ሁነታ ተጨምሯል::":"Position has been added successflly!"}
    </Alert>}
    </form>
    </>
}
const EditForm = ({id,func,data}) => {
    var target;
    target = data.filter((data)=>data.id==id)
    const schema = yup.object().shape({
      position2: yup.string().required("position is required!").min(2, "Position is too short!"),
      description2: yup.string().required("description is required!").min(5, "Description is too short!"),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });
    const [showAlert, setShowAlert] = useState(false);
    const handleShowAlert = () => {
      setShowAlert(true);
    };
  
    const onSubmit = async(formData) => {
      var updated = (data)=>{
        for(var i=0;i<data.length;i++){
          if(data[i].id == id){
            data[i].description = formData.description2;
            data[i].position = formData.position2
          }
        }
        return data
      }
      await axios.put(`http://localhost:3030/parent/0`,{
       position:updated(data)
      })
     
      func((prev)=>!prev)
    };
    const language = useSelector((state) => state.language.value);
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
           <label>{language=="amharic"?"ቦታ":"Position"}:</label>
          <Input type="text" placeholder="Position...." {...register("position2")} defaultValue={target[0].position}></Input>
          <p style={{ color: "white", width: "200px", color: "red" }}>{errors.position2?.message}</p>
          <label>{language=="amharic"?"መግለጫ":"Description"}:</label>
          <Textarea {...register("description2")} placeholder='Description....' defaultValue={target[0].description}></Textarea>
          <p style={{ color: "white", width: "200px", color: "red" }}>{errors.description2?.message}</p>
          <button className='bg-sky-500 p-2 rounded-lg text-white  hover:bg-sky-400' type='submit'>{language=="amharic"?"ለውጦችን አስቀምጥ":"Save Changes"}</button>
          {showAlert && <Alert  title={language=="amharic"?"ተሳክቷል!":"Success!"} color="green">
      {language=="amharic"?" ቦታው በተሳካ ሁነታ ተስተካክሏል::":"Position has been eddited successflly!"}
    </Alert>}
        </form>
      </>
    );
  };
  const AddChildForm = ({ id, func }) => {
    const [treeData, setTreeData] = useState([]);
    useEffect(()=>{
      axios.get('http://localhost:3030/parent/0').then((res)=>setTreeData(res.data.position))
    },[])
    const renderOptions = (data) => {
      return data.map((item) => {
        const arr = [item.parentId,item.position]; // Define the arr here
        return (
          <>
            <option value={arr}>{item.position}</option>
            {item.children && item.children.length > 0 && renderOptions(item.children)}
          </>
        );
      });
    }
    
    const schema = yup.object().shape({
      position3: yup.string().required("position is required!").min(2, "Position is too short!"),
      description3: yup.string().required("description is required!").min(5, "Description is too short!"),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);

    const handleShowAlert = () => {
      setShowAlert(true);
    };
    const [rawData,setRawData] = useState([])
    const onSubmit = async (formData) => {
      const position = formData.select.split(",");

      // const newChildData = {
      //   id: uuidv4(),
      //   position: formData.position3,
      //   parentId: position[0],
      //   description: formData.description3,
      //   children: [],
      // };
    
      try {
        const response = await axios.get("http://localhost:3030/parent/0");
        const rawData = response.data.position;
        var found = 0
        function check(name, data) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].position == name) {
             found = 1;
              return found;
            } else if (data[i].children && data[i].children.length > 0) {
              check(name, data[i].children);
            }
          }
          return found;
        }
        var final = check(formData.position3, rawData);
        function add(name, data) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].position == name) {
              data[i].children.push({
                id: uuidv4(),
                position: formData.position3,
                parentId: data[i].id,
                description: formData.description3,
                children: [],
              });
              return data;
            } else if (data[i].children && data[i].children.length > 0) {
              add(name, data[i].children);
            }
          }
          return data;
        }
    if(final==0){
       var updated = add(position[1], rawData);
        await axios.put(`http://localhost:3030/parent/0`, {
          position: updated,
        });
        if(position[0]!=""){
          func((prev) => !prev);
          handleShowAlert(); 
        }
        else if(position[0] == ""){
          setShowAlert3(true)
          setTimeout( ()=>{setShowAlert3(false)}, 3000)
        }
    }
    else{
      setShowAlert2(true)
      setTimeout(()=>{setShowAlert2(false)}, 3000)
    }
       
    
     
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
   

    };
    const language = useSelector((state) => state.language.value);
    
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>{language=="amharic"?"ቦታ":"Position"}:</label>
          <Input type="text" placeholder="Position...." {...register("position3")} ></Input>
          <p style={{ color: "white", width: "200px", color: "red" }}>{errors.position3?.message}</p>
          <label>{language=="amharic"?"መግለጫ":"Description"}:</label>
          <Textarea {...register("description3")} placeholder='Description....' ></Textarea>
          <p style={{ color: "white", width: "200px", color: "red" }}>{errors.description3?.message}</p>
          <label>Parent:</label><br></br>
          <select style={{border:"1px solid #00cccc",width:"250px",height:"30px"}} {...register("select")}>
          <option value="" disabled selected>Select Parent</option>
          {renderOptions(treeData)}
          </select><br></br><br></br>
     <button className='bg-sky-500 p-2 rounded-lg text-white w-20 text-center hover:bg-sky-400' type='submit'>{language=="amharic"?"ጨምር":"Add"}</button>
     {showAlert && <Alert  title={language=="amharic"?"ተሳክቷል!":"Success!"} color="green">
     {language=="amharic"?" ቦታው በተሳካ ሁነታ ተጨምሯል::":"Children node has been added successflly!"}
   </Alert>}
   {showAlert2 && <Alert  title={language=="amharic"?"አልተሳካም፡፡":"Failed!"} color="red">
     {language=="amharic"?" አልተሳካም::":"There is already position with that name!"}
   </Alert>}
   {showAlert3 && <Alert  title={language=="amharic"?"አልተሳካም፡፡":"Warning!"} color="yellow">
     {language=="amharic"?" በተሰብ አስገባ::":"Please provide parent position!"}
   </Alert>}
        </form>
      </>
    );
  };
  const EditChild = ({name,func,id,parentId})=>{
    const [treeData, setTreeData] = useState([]);
    useEffect(()=>{
      axios.get('http://localhost:3030/parent/0').then((res)=>setTreeData(res.data.position))
    },[]);
    var position = ""
    var desc = ""
    function finds(data,name){
    for (let i = 0; i < data.length; i++) {
      if (data[i].position == name) {
       position = data[i].position
        desc = data[i].description
        return;
      } else if (data[i].children && data[i].children.length > 0) {
        finds(data[i].children,name);
      }
    }}
    finds(treeData,name)
    
    const schema = yup.object().shape({
      position3: yup.string().required("position is required!").min(2, "Position is too short!"),
      description3: yup.string().required("description is required!").min(5, "Description is too short!"),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });
    const [showAlert, setShowAlert] = useState(false);
    const handleShowAlert = () => {
      setShowAlert(true);
    };
    const [rawData,setRawData] = useState([])
    const onSubmit = async (formData) => {
      if(formData.select == ""){
        
      const newChildData = {
        position: formData.position3,
        description: formData.description3,
      };
    
      try {
        const response = await axios.get("http://localhost:3030/parent/0");
        const rawData = response.data.position;
        function add(name, dataToBeAdded, data) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].position == name) {
              data[i].position = dataToBeAdded.position;
              data[i].description = dataToBeAdded.description;
              return data;
            } else if (data[i].children && data[i].children.length > 0) {
              add(name, dataToBeAdded, data[i].children);
            }
          }
          return data;
        }
    
        var updated = add(name, newChildData, rawData);
        await axios.put(`http://localhost:3030/parent/0`, {
          position: updated,
        });
    
     
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    }
    else{
      const position = formData.select.split(",");
      var targetData = {
          id:id,
          position: formData.position3,
          parentId:position[0],
          description: formData.description3,
          children:[]
      }

      try {
        const response = await axios.get("http://localhost:3030/parent/0");
        const rawData = response.data.position;
        function find(id, data,targetData) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
              targetData.children = data[i].children
              return targetData;
            } else if (data[i].children && data[i].children.length > 0) {
              find(id,  data[i].children,targetData);
            }
          }
          return targetData;
        }
        //newTarget is the one with all neccessary childs
            var newTarget = find(id,rawData,targetData);
        function deleteTarget(id,data,parentId) {
          for (let i = 0; i < data.length; i++) {
        if (data[i].id == parentId) {
            data[i].children = data[i].children.filter((data)=>data.id != id)    
          return data;
        } else if (data[i].children && data[i].children.length > 0) {
          deleteTarget(id, data[i].children,parentId);
        }
      }
      return data;
    }
    var DataWithOutTarget = deleteTarget(id,treeData,parentId);
    function add(name, data,dataToAdd) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].position == name) {
              data[i].children.push({
                id: dataToAdd.id,
                position: dataToAdd.position,
                parentId: dataToAdd.parentId,
                description: dataToAdd.description,
                children: dataToAdd.children,
              });
              return data;
            } else if (data[i].children && data[i].children.length > 0) {
              add(name, data[i].children,dataToAdd);
            }
          }
          return data;
        }
        var updated = add(position[1],DataWithOutTarget,newTarget)
        await axios.put(`http://localhost:3030/parent/0`, {
          position: updated,
        });     
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    }
      func((prev) => !prev);
        handleShowAlert();

    };
    var dead = false
    const renderOptions = (data) => {
      if(!dead){
      return data.map((item) => {
        if(item.position != name){
          const arr = [item.id,item.position]; // Define the arr here
          return (
            <>
             <option value={arr}>{item.position}</option> 
             {item.children && item.children.length > 0 && renderOptions(item.children)}
            </>
          );
        }
        else if(name == item.position){
          dead = true
        }
        
      });
    }
    }
    const language = useSelector((state) => state.language.value);  
    const mess  = <div>
      <p>New Parent (<span className='text-slate-500 text-sm font-bold'>Leave it blank if you dont want to change it</span>)  </p>  </div>
    return<>
          <form onSubmit={handleSubmit(onSubmit)}>
          <label>{language=="amharic"?"ቦታ":"Position"}:</label>
          <Input type="text" placeholder="Position...." {...register("position3")} defaultValue={position}></Input>
          <p style={{ color: "white", width: "200px", color: "red" }}>{errors.position3?.message}</p>
          <label>{language=="amharic"?"መግለጫ":"Description"}:</label>
          <Textarea {...register("description3")} placeholder='Description....' defaultValue={desc}></Textarea>
          <p style={{ color: "white", width: "200px", color: "red" }}>{errors.description3?.message}</p>
         <br></br>
        {mess}
         <select className='border-1 border-slate-300 w-60 p-2' {...register("select")}> 
         //The root node can not be a child of any other node so the options must be empty
         <option value="" ></option>
          { parentId=="None"?"":renderOptions(treeData)}
          </select><br></br><br></br>
     <button className='bg-sky-500 p-2 rounded-lg text-white hover:bg-sky-400' type='submit'>{language=="amharic"?"ጨምር":"Save Changes"}</button>
     {showAlert && <Alert  title={language=="amharic"?"ተሳክቷል!":"Success!"} color="green">
     {language=="amharic"?" ቦታው በተሳካ ሁነታ ተጨምሯል::":"Children node has been updated successflly!"}
   </Alert>}
        </form>
    </>
  }
  

  
