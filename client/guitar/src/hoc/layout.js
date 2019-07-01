

import React,{Component} from 'react';
import Header from '../components/header-footer/header/index';
// imported from the '../components/header-footer/header/index'
// to be used as <Header/> in line 12 .

import Footer from '../components/header-footer/footer/index';
import { connect } from 'react-redux';
import { getSiteData } from '../actions/site_actions';

class Layout extends Component{

    componentDidMount(){
        if(Object.keys(this.props.site).length === 0){
            this.props.dispatch(getSiteData());
        }
    }
    
   render() {
        return (
            <div>
                <Header/>
                <div className="page_container">
                    {this.props.children}
                </div>
                <Footer data={this.props.site}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}

export default connect(mapStateToProps)(Layout);