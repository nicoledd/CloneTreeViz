import './ImportFile.css'

export default function CloneTree() {

    // https://www.svgrepo.com/svg/365851/upload-simple-thin

    return (<>
            <div style={{flexDirection:"column", alignItems:"center", display:'flex'}}>
                <b>Imported File</b>
                <div style={{flexDirection:"row", alignItems:"center", display:"flex", justify: 'space-between', gap:"5px"}}>
                    <button className="importbutton" type="button">
                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                            <g id="SVGRepo_iconCarrier"> <path d="M83.17139,84.81738a4.00016,4.00016,0,0,1,.00049-5.65722l42-41.98926a4.00206,4.00206,0,0,1,5.65624,0l42,41.98926a4.00026,4.00026,0,0,1-5.65624,5.6582L132,49.65527V152a4,4,0,0,1-8,0V49.65527L88.82812,84.81836A4,4,0,0,1,83.17139,84.81738ZM216,148a4.0002,4.0002,0,0,0-4,4v56a4.00427,4.00427,0,0,1-4,4H48a4.00427,4.00427,0,0,1-4-4V152a4,4,0,0,0-8,0v56a12.01343,12.01343,0,0,0,12,12H208a12.01343,12.01343,0,0,0,12-12V152A4.0002,4.0002,0,0,0,216,148Z"/> </g>
                        </svg>
                    </button>
                    <p>exampleTree.json</p>

                    <button className="importbutton" type="button">
                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M83.17139,84.81738a4.00016,4.00016,0,0,1,.00049-5.65722l42-41.98926a4.00206,4.00206,0,0,1,5.65624,0l42,41.98926a4.00026,4.00026,0,0,1-5.65624,5.6582L132,49.65527V152a4,4,0,0,1-8,0V49.65527L88.82812,84.81836A4,4,0,0,1,83.17139,84.81738ZM216,148a4.0002,4.0002,0,0,0-4,4v56a4.00427,4.00427,0,0,1-4,4H48a4.00427,4.00427,0,0,1-4-4V152a4,4,0,0,0-8,0v56a12.01343,12.01343,0,0,0,12,12H208a12.01343,12.01343,0,0,0,12-12V152A4.0002,4.0002,0,0,0,216,148Z"></path> </g></svg>
                    </button>
                </div>
            </div>

    </>);
}