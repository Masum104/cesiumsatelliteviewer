import React, { useState } from 'react'
import styles from '../styles/sidebar.module.scss'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router';
import { VscDebugAltSmall } from 'react-icons/vsc';
import { MdDashboard, MdOutlineSatelliteAlt, MdOutlineFilterList } from "react-icons/md";
import { IoMdClose, IoMdCalendar, IoIosImages } from 'react-icons/io';
import { BiSolidMemoryCard } from 'react-icons/bi';
import { ImWrench } from "react-icons/im";
import { LuOrbit } from "react-icons/lu";
import { GrDocumentUpdate } from "react-icons/gr";
import Link from 'next/link';

const Sidebar = () => {
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const [dropdown1, setDropdown1] = useState(false);

    const handleClick1 = () => {
        setDropdown1(true);
    }
    
    const className = open ? '' : styles.open;
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarContent}>
                <div className={styles.sidebarNavigation}>
                    <Link href="/" className={router.pathname === '/' ? styles.dropdownBtnActive : styles.dropdownBtn}><MdDashboard /><span>Health Dashboard</span></Link>
                </div>
                <div className={styles.sidebarNavigation}>
                    <Button type="button" className={router.pathname === '/orbitManeuver' || router.pathname === '/memoryScrub' || router.pathname === '/orbitParameterUpdate' || router.pathname === '/payloadDiagnosticActivity' ? styles.dropdownBtnActive : styles.dropdownBtn} onClick={handleClick1}>
                        <ImWrench /><span>Maintenance Request</span>
                        {/* {dropdown1 ? <IoIosArrowUp /> : <IoIosArrowDown />} */}

                        <div className={styles.navLinkFilter}>
                            Filters<MdOutlineFilterList />
                        </div>
                    </Button>
                    {dropdown1 && <div className={styles.dropdownMenu}>
                        <Link href="/memoryScrub" className={router.pathname === '/memoryScrub' ? styles.active : ''}><BiSolidMemoryCard /><span>Memory Scrub</span></Link>
                        <Link href="/orbitManeuver" className={router.pathname === '/orbitManeuver' ? styles.active : ''}><LuOrbit/><span>Orbit Maneuver</span></Link>
                        <Link href="/orbitParameterUpdate" className={router.pathname === '/orbitParameterUpdate' ? styles.active : ''}><GrDocumentUpdate /><span>Orbit Parameter Update</span></Link>
                        <Link href="/payloadDiagnosticActivity" className={router.pathname === '/payloadDiagnosticActivity' ? styles.active : ''}><VscDebugAltSmall/><span>Payload Diagnostic Activity</span></Link>
                    </div>}
                </div>
                <div className={styles.sidebarNavigation}>
                    <Link href="/schedules" className={router.pathname === '/schedules' ? styles.dropdownBtnActive : styles.dropdownBtn}><IoMdCalendar /><span>Schedules</span></Link>
                </div>
                {/* <div className={styles.sidebarNavigation}>
                    <Button type="button" className={styles.dropdownBtn} onClick={handleClick3}>
                        <MdWebAsset />
                        Health Dashboard 
                        {dropdown3 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </Button>
                    {dropdown3 && <div className={styles.dropdownMenu}>
                        <Link href="/assetStatus" className={router.pathname === '/assetStatus' ? styles.active : ''}><RxPieChart /><span>Asset Status</span> <IoMdClose onClick={() => setDropdown3(false)} /></Link>
                        <Link href="/addGS" className={router.pathname === '/addGS' ? styles.active : ''}><RxPieChart /><span>Add GS</span> <IoMdClose onClick={() => setDropdown3(false)} /></Link>
                        <Link href="/addSAT" className={router.pathname === '/addSAT' ? styles.active : ''}><RxPieChart /><span>Add SAT</span> <IoMdClose onClick={() => setDropdown3(false)} /></Link>
                    </div>}
                </div> */}
                <div className={styles.sidebarNavigation}>
                    <Link href="/assetStatus" className={router.pathname === '/assetStatus' ? styles.dropdownBtnActive : styles.dropdownBtn}><MdOutlineSatelliteAlt /><span>Asset Status</span></Link>
                </div>
                <div className={styles.sidebarNavigation}>
                    <Link href="/imageOrders" className={router.pathname === '/imageOrders' ? styles.dropdownBtnActive : styles.dropdownBtn}><IoIosImages /><span>Image Orders</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar