import './screen.css';

export const Screen = ({scanResults}) => {

    return(
        <div id='reader' className="screen">
           {
            scanResults? <p className='result'>{scanResults}</p> : <p>error</p>
            
           }
        </div>
    )
}