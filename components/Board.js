import React, {useRef, useEffect, useState} from 'react'
import styles from '../styles/Board.module.css'
import { supabase } from '../utils/supabaseClient'
import Timer from './Timer'
import { useRouter } from 'next/router'

function Board(props) {
    const router = useRouter()
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [img, setImg] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `100%`;
        canvas.style.height = `100%`;

        const context = canvas.getContext("2d")
        context.scale(2,2)
        context.lineCap = "round"
        context.strokeStyle = "black"
        context.lineWidth = 5

        contextRef.current =context
    }, [])

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const finishDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
        // console.log('context',contextRef.current)
        // console.log('canvas',canvasRef.current)
        // const imageData = contextRef.current.getImageData(0, 0,100,100)
        // console.log('ImageData', imageData)
        // contextRef.current.putImageData(imageData, 150, 10);
        var dataURL = canvasRef.current.toDataURL();
        console.log(dataURL);
        setImg(dataURL)
    }

    const draw = ({nativeEvent}) => {
        if(!isDrawing)
        {
            return
        }

        const {offsetX, offsetY} = nativeEvent
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()

    }

    const clearCanvas = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    async function submitImage(){
        setLoading(true)

        const { data, error } = await supabase
        .from('Images')
        .insert([
            { owner: props.user.email, image : canvasRef.current.toDataURL() }
        ])

        setLoading(false)
        router.push('/account')
    }

    return (
        <div className={styles.canvas_conatiner}>
            <div className={styles.controls}>
                    <div className={styles.icon}  onClick={clearCanvas}>
                        <i className={"fas fa-trash-alt"}></i>
                    </div>
                    <Timer/>
                    <div className={styles.icon} onClick={submitImage} style={{color:'var(--color-black)'}}>
                        {loading?'  Loading...':<i className={"fas fa-upload"}></i>}
                    </div>
            </div>

            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}

                onDragStart={startDrawing}
                onDragEnd={finishDrawing}
                onDrag={draw}

                ref={canvasRef}
                style={{height:'calc(100vh - var(--navbar-height))',cursor:'pointer'}}
            />
            
            {/* <div className={styles.img}>
                <img src={img} height="100px" width="100px"></img>
            </div> */}
            
        </div>
    )
}

export default Board
