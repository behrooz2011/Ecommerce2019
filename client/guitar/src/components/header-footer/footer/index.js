

import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
//we need four different icones at the bottom of footer
	// const Footer=()=>{
//     return (
//     	<footer className="bck_b_dark">
//     		<div className='container'>
//     			<div className='logo'>
//     				My Shop
//     			</div>

//     			<div className='wrapper'>
//     				<div className="left">
//     					<h2>contact information </h2>
//     					<div className='business_nfo'>
//     						<div className='tag'>
//     							<FontAwesomeIcon
//     							icon={faCompass}
//     							className='icon'
//     							/>
//     							<div className='nfo'>
//     								<div>Address</div>
//     								<div> 22 Toronto</div>
//     							</div>

//     						</div>

//     						<div className='tag'>
//     							<FontAwesomeIcon
//     							icon={faPhone}
//     							className='icon'
//     							/>
//     							<div className='nfo'>
//     								<div>Phone:</div>
//     								<div> 226 555 1111</div>
//     							</div>

//     						</div>

//     						<div className='tag'>
//     							<FontAwesomeIcon
//     							icon={faClock}
//     							className='icon'
//     							/>
//     							<div className='nfo'>
//     								<div>Working hours</div>
//     								<div> Monday to Friday , 8am till 7pm</div>
//     							</div>

//     						</div>

//     						<div className='tag'>
//     							<FontAwesomeIcon
//     							icon={faEnvelope}
//     							className='icon'
//     							/>
//     							<div className='nfo'>
//     								<div>Post Office</div>
//     								<div> 22 Toronto</div>
//     							</div>

//     						</div>
//     					</div>
//     				</div>

//     				<div className="right">
//     					<h2>Be the first one to get our early bird discount </h2>
//     					<div> Get our discounts
//     						<div>
//     							Subscribe to our newsletter to get the latest discount. we'll send you two emails each month
//     						</div>
//     					</div>
//     				</div>

//     			</div>

//     		</div>
//     	</footer>
//     );
//   }

// export default Footer;

const Footer = ({data}) => {
    return (
        data.siteData ?
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    Waves
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faCompass}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>{data.siteData[0].address}</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>{data.siteData[0].phone}</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Working hours</div>
                                    <div>{data.siteData[0].hours}</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>{data.siteData[0].email}</div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="left">
                        <h2>Be the first to know</h2>
                        <div>
                            <div>
                            Get all the latest information on events, sales and offers.You can miss out.
                            </div>
                        </div>
                    </div>      
                </div>
            </div>
        </footer>
        :null
    );
};

export default Footer;