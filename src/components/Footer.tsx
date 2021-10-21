
 const Footer = () => { 


    return (
        <div style={{bottom:"0%", position:"fixed", width:"100%", borderTop:"0.5px solid grey", background:"#ffffff", color:"grey"}}>
            <div className="ftr" style={{margin:"0.2% 0% 0.2% 2%", fontWeight:"bolder"}}>
                <label>Found Animal Aplication </label>
                <div style={{textAlign:"right"}}>
                    <label>  Created by: Antanas Bendoraitis</label> 
                </div>
            </div>
        </div>
    );
};

export default Footer;