import React, { useState, useEffect } from "react";
import Head from 'next/head'
import { Container, Button} from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import DashBoardHeader from '../components/DashBoardHeader'
import DataTable from '../components/DataTable'
import styles from '../styles/dashboard.module.scss'
import AddGSModal from '../components/AddGSModal'
import AddSATModal from '../components/AddSATModal'
import { BiPlusCircle } from "react-icons/bi";
import axios from "axios";
import Viewer2D from "@/components/Map/Viewer2D/Viewer2D";
import Viewer3D from "@/components/Map/Viewer3D/Viewer3D";

const columns = [
  {
    Header: 'GS',
    accessor: 'gs', // Property name in your data
  },
  {
    Header: 'In Contact',
    accessor: 'inContact',
  },
  {
    Header: 'Duration',
    accessor: 'duration',
  },
  {
    Header: 'Lost of signal',
    accessor: 'lostOfSignal',
  },
];

// when you add API Url just comment this
const data = [{
  gs: 1,
  inContact: "SAT 1",
  duration: "10 minutes",
  lostOfSignal: "16:30:00"
},{
  gs: 1,
  inContact: "False",
  duration: "False/O",
  lostOfSignal: "00:00:00"
},{
  gs: 1,
  inContact: "SAT 4",
  duration: "12 minutes",
  lostOfSignal: "18:40:00"
}];

const columns2 = [
  {
    Header: 'SAT',
    accessor: 'sat', // Property name in your data
  },
  {
    Header: 'Storage Current',
    accessor: 'storageCurrent',
  },
  {
    Header: 'Main',
    accessor: 'main',
  },
  {
    Header: 'Out',
    accessor: 'out',
  },
  {
    Header: 'Power',
    accessor: 'power',
  }
];

// when you add API Url just comment this
const data2 = [{
  sat: 1,
  storageCurrent: "32gb",
  main: "False",
  out: "False",
  power: "Eclipse"
},{
  sat: 2,
  storageCurrent: "16gb",
  main: "True",
  out: "False",
  power: "Sunlight"
}];

export default function AssetStatus() {
  // uncomment the below line when you add link in axios
  // const [data, setData] = useState([]);
  const [hideShowSidebar, setHideShowSidebar] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openDropdown, setOpenDropdown] = useState(false);

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  useEffect(() => {
    // just change the url and uncomment the inner code
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      // setData(response.data);
    });

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Head>
        <title>dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='dashboard'>
        <Sidebar/>
        <DashBoardHeader />
        <div className="dashboardContent">
          <div className={styles.dashboardMainContent}>
            <Container className={styles.container}>
              <div className={styles.dashboardContentRow}>
                <div className={styles.TableCol}>
                  <div className={styles.TableHeading}>
                    <h4>{currentTime.toLocaleString()}</h4>
                    <div className={styles.assetsDropdown}>
                      <Button type="button" className={styles.assetsDropdownBtn} onClick={()=>setOpenDropdown(!openDropdown)}>
                          Add Assets
                          {/* {dropdown1 ? <IoIosArrowUp /> : <IoIosArrowDown />} */}
                      </Button>
                      {openDropdown && <div className={styles.assetsDropdownMenu}>
                        <Button type="button" onClick={() => setShowModal1(true)}><BiPlusCircle /><span>Add GS</span></Button>
                        <Button type="button" onClick={() => setShowModal2(true)}><BiPlusCircle /><span>Add SAT</span></Button>
                      </div>}
                    </div>
                  </div>
                  <DataTable 
                    search = {false}
                    tablePagination = {true}
                    columns = {columns}
                    data = {data}
                    rowSeletion = {false}
                    actionBtn= {false}
                    actionBtnText= ""
                    
                  />
                  <hr/>
                  <DataTable 
                    search = {false}
                    tablePagination = {true}
                    columns = {columns2}
                    data = {data2}
                    rowSeletion = {false}
                    actionBtn= {false}
                    actionBtnText= ""
                  />
                </div>
                <br/><br/>
                <Viewer2D></Viewer2D>
                <br/><br/>
                <Viewer3D></Viewer3D>
              </div>
            </Container>
          </div>
        </div>
      </main>
      <AddGSModal
        showModal1={showModal1} 
        setShowModal1={setShowModal1}
      />
      <AddSATModal 
        showModal2={showModal2} 
        setShowModal2={setShowModal2}
      />
    </>
  )
}
