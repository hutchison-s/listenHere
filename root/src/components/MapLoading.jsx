import "./MapLoading.css"
export default function MapLoading() {

    const rotations = [0, 60, 120, 180, 240, 300]

    return (
        <div className="outer">
            <div className="inner">
                {rotations.map((n, i) => (
                    <div key={i} className="inner-box" style={{rotate: `${n}deg`, display: 'flex'}}>
                        <div style={{flex: '1'}}></div><div className="inner-line" style={{flex: '1'}}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}