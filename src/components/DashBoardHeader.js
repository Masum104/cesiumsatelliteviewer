import React from 'react'
import styles from '../styles/dashBoardHeader.module.scss'
import { Container, Button } from 'react-bootstrap'
import { useRouter } from 'next/router';

const DashboardHeader = () => {
    const router = useRouter();
    return (
        <div className={styles.dHeader}>
            <Container className={styles.container}>
                <div className={styles.dHeaderContent}>
                    {/* <div class="logo"></div> */}
                    {router.pathname === '/' ? "" :
                    <div className={styles.mainSearch}>
                        <div className={styles.searchBar}>
                            <div className={styles.searchBoxWithIcon}>
                                <div className={styles.searchBoxIcon}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 11h-.79l-.28-.27A6.471 6.471 0 0 0 13 6.5 6.5 6.5 0 1 0 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z" fill="currentColor" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                                <div  className={styles.searchAutoComplete}>
                                    <div className={styles.searchAutoCompleteLine}>
                                        <label className={styles.searchAutoCompleteInput}>
                                            <input className={styles.searchAutoCompleteInputElement} placeholder="Search Equipment" value="" />
                                            {/* <div className={styles.slideDown}>
                                                <div className={styles.menu}>
                                                    <div className={styles.menuItem}>Account</div>
                                                    <div className={styles.menuItem}>Activated</div>
                                                    <div className={styles.menuItem}>Audio Verification</div>
                                                    <div className={styles.menuItem}>BBA</div>
                                                    <div className={styles.menuItem}>Communicator</div>
                                                    <div className={styles.menuItem}>Configuration</div>
                                                    <div className={styles.menuItem}>Control Panel</div>
                                                    <div className={styles.menuItem}>Customer App</div>
                                                    <div className={styles.menuItem}>Device Id</div>
                                                    <div className={styles.menuItem}>Fault</div>
                                                    <div className={styles.menuItem}>Faulty</div>
                                                    <div className={styles.menuItem}>First discovery</div>
                                                    <div className={styles.menuItem}>GPRS</div>
                                                    <div className={styles.menuItem}>Group</div>
                                                    <div className={styles.menuItem}>Installer App</div>
                                                    <div className={styles.menuItem}>Model</div>
                                                    <div className={styles.menuItem}>Operator</div>
                                                    <div className={styles.menuItem}>Output Expander</div>
                                                    <div className={styles.menuItem}>Panel Id</div>
                                                    <div className={styles.menuItem}>PGH</div>
                                                    <div className={styles.menuItem}>Power Link</div>
                                                    <div className={styles.menuItem}>Power Supply HSM2300</div>
                                                    <div className={styles.menuItem}>Power Supply With Outputs</div>
                                                    <div className={styles.menuItem}>Wired Keypad</div>
                                                    <div className={styles.menuItem}>Zone Expander</div>
                                                </div>
                                            </div> */}
                                        </label>
                                    </div>
                                </div>
                                <Button type="button" className={styles.btn}>
                                    <svg width="15" height="9" viewBox="0 0 15 9" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.708 0L7.2 5.496 1.692 0 0 1.692l7.2 7.2 7.2-7.2z" fill="currentColor" fillRule="evenodd"></path>
                                    </svg>
                                </Button>
                            </div>
                            <div className="slideDown"></div>
                        </div>
                    </div>}
                </div>
            </Container>
        </div>
    )
}

export default DashboardHeader