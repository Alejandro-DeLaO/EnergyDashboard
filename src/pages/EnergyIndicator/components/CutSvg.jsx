import React from "react";
import "./cut-svg.styles.css"
import { Link } from "react-router-dom";
import { scroll } from "../../../utils/scroll";

export default function CutSvg(){
    const handleClick = () => scroll();
    return (
        <section>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1227.000000 800.000000" id="map-svg" style={{backgroundColor:"black", maxHeight: "500px"}}>
            <g id ="waves">
                <Link to='/indicador/plantel2' onClick={handleClick}>
                    <g id ="medicina">
                        <rect path transform="translate(700,600) scale(0.25,0.2)" width="1330" height="500" fill="transparent"/>
                        <path transform="translate(700,600) scale(0.25,0.2)" fillOpacity='0.5'/>
                        <path transform="translate(700,600) scale(0.25,0.2)" fillOpacity='0.7'/>
                        <path transform="translate(700,600) scale(0.25,0.2)" fillOpacity='0.9'/>
                    </g>   
                </Link >

                <Link to='/indicador/instituto-energias-renovables' onClick={handleClick}>
                    <g id="energia">
                        <rect transform="translate(300,430) scale(0.1,0.4)" width="1330" height="500" fill="transparent"/>
                        <path transform="translate(300,430) scale(0.1,0.4)" fillOpacity='0.5'/>
                        <path transform="translate(300,430) scale(0.1,0.4)" fillOpacity='0.7'/>
                        <path transform="translate(300,430) scale(0.1,0.4)" fillOpacity='0.9'/>
                    </g>
                </Link>

                <Link to='/indicador/biblioteca' onClick={handleClick}>
                    <g id="biblioteca">
                        <rect transform="translate(445,215) scale(0.1,0.4)" width="1330" height="500" fill="transparent"/>
                        <path transform="translate(445,215) scale(0.1,0.4)" fillOpacity='0.5'/>
                        <path transform="translate(445,215) scale(0.1,0.4)" fillOpacity='0.7'/>
                        <path transform="translate(445,215) scale(0.1,0.4)" fillOpacity='0.9'/>
                    </g>
                </Link>

                <Link to='/indicador/centro-atencion-estudiantes' onClick={handleClick}>
                    <g id="atencion">
                        <rect transform="translate(180,445) scale(0.09,0.2)" width="1330" height="500" fill="transparent"/>
                        <path transform="translate(180,445) scale(0.09,0.2)" fillOpacity='0.5'/>
                        <path transform="translate(180,445) scale(0.09,0.2)" fillOpacity='0.7'/>
                        <path transform="translate(180,445) scale(0.09,0.2)" fillOpacity='0.9'/>
                    </g>
                </Link>
            </g>
            

            <g transform="translate(0.000000,800.000000) scale(0.100000,-0.100000)" fill="white">
            <path d="M0 4000 l0 -4000 6135 0 6135 0 0 4000 0 4000 -6135 0 -6135 0 0
            -4000z m8605 3840 c286 -5 558 -12 604 -16 l83 -6 -6 -331 c-4 -183 -9 -354
            -12 -381 l-6 -48 -392 6 c-215 4 -403 9 -417 12 l-27 5 -8 247 -9 247 -55 7
            c-30 4 -130 10 -222 14 l-168 6 0 124 0 124 58 0 c31 0 291 -4 577 -10z m314
            -1020 c332 -6 606 -12 608 -13 4 -5 -17 -260 -22 -265 -6 -6 -1481 18 -1532
            25 l-45 6 7 86 c3 47 8 108 11 134 l6 48 182 -6 c99 -3 453 -10 785 -15z
            m1019 -192 c7 -7 12 -24 12 -38 0 -23 -6 -28 -45 -37 -51 -12 -50 -12 -59 39
            -5 30 -3 37 11 41 35 9 69 7 81 -5z m-1046 -297 c247 -4 451 -10 454 -14 7 -6
            -9 -264 -17 -270 -2 -2 -71 0 -154 5 -82 4 -338 11 -567 14 l-418 6 0 137 0
            136 127 -3 c71 -1 329 -6 575 -11z m1184 -1 c252 -5 506 -13 562 -16 l104 -6
            -6 -69 c-3 -38 -9 -101 -12 -140 l-6 -70 -142 6 c-77 3 -325 10 -551 15 -225
            6 -420 13 -432 16 -22 6 -23 10 -23 140 0 134 0 134 23 134 13 0 231 -4 483
            -10z m-6732 -739 l-7 -189 97 -7 96 -7 0 -155 0 -155 -227 6 c-126 3 -361 8
            -523 11 -162 3 -366 8 -452 11 l-158 6 0 148 0 148 310 7 c171 4 310 11 310
            16 0 4 4 19 9 32 9 23 11 24 63 14 47 -8 56 -14 65 -38 l11 -29 94 0 95 0 30
            38 c30 37 31 41 38 185 l7 147 75 0 74 0 -7 -189z m-1593 -61 c4 -25 10 -136
            14 -247 l7 -203 -221 0 -221 0 0 199 0 199 130 7 130 7 6 34 c5 29 11 34 43
            39 20 4 43 8 51 10 43 9 55 1 61 -45z m4994 -25 c165 -3 375 -8 468 -11 l167
            -6 0 -85 0 -85 -197 6 c-109 3 -355 8 -548 11 -192 3 -367 8 -388 11 l-38 6 6
            56 c3 32 9 70 12 86 l5 28 107 -6 c58 -3 241 -8 406 -11z m3975 -85 c457 -13
            633 -19 703 -26 l59 -6 -7 -117 c-4 -64 -12 -124 -17 -133 -8 -16 -28 -18
            -201 -18 -232 0 -853 18 -994 29 -92 7 -106 11 -129 34 -23 23 -25 33 -25 97
            0 40 3 92 7 117 l7 45 126 -6 c69 -3 281 -11 471 -16z m-6087 -200 l-6 -140
            70 0 71 0 7 140 7 140 143 0 143 0 7 -150 7 -150 63 0 63 0 7 150 7 150 108 0
            108 0 -2 -152 -1 -153 108 -9 109 -9 -6 -76 c-3 -42 -8 -203 -12 -358 l-6
            -283 -47 0 c-138 0 -931 20 -1018 26 -70 4 -100 9 -98 17 2 7 9 217 15 467 6
            250 13 472 17 493 l6 37 67 0 68 0 -5 -140z m4410 114 l597 -6 0 -123 0 -123
            -195 -7 -195 -7 0 -168 0 -167 148 -7 c81 -3 359 -11 617 -16 259 -5 544 -12
            633 -16 l164 -6 -6 -59 c-3 -32 -9 -86 -12 -118 l-6 -60 -51 -6 c-29 -4 -278
            -2 -555 4 -605 13 -882 14 -882 3 0 -5 28 -36 63 -69 55 -53 68 -61 114 -67
            51 -6 52 -8 58 -44 11 -68 30 -101 94 -167 l64 -67 91 -9 c265 -25 521 9 764
            102 45 17 86 28 91 25 14 -9 73 -178 64 -186 -17 -15 -193 -79 -283 -104 -193
            -53 -442 -70 -668 -46 -152 16 -142 11 -142 81 l0 61 -81 79 c-45 43 -88 79
            -96 79 -8 0 -29 -11 -47 -25 l-33 -25 -22 24 -23 25 21 29 c28 39 27 53 -6 84
            l-28 26 -615 6 c-338 4 -650 9 -692 12 l-78 6 0 135 0 136 43 -7 c23 -3 281
            -9 573 -13 l531 -6 6 34 c3 19 9 55 12 80 6 43 9 47 46 58 27 8 39 17 39 30 0
            15 -10 21 -49 26 -52 7 -65 22 -50 62 6 16 20 23 58 28 l51 7 0 113 0 113
            -620 7 -620 7 0 130 0 130 258 -6 c141 -3 526 -9 855 -12z m-2645 -140 l282
            -7 0 -114 0 -115 -77 6 c-43 3 -145 8 -228 11 -82 3 -196 8 -252 11 l-103 6 0
            110 0 110 48 -6 c26 -3 174 -8 330 -12z m587 -143 c83 -6 203 -13 268 -17
            l117 -6 0 -76 c0 -167 -43 -928 -53 -938 -6 -6 -668 25 -690 32 -11 4 -15 12
            -12 27 3 12 18 132 35 265 37 296 98 721 105 732 3 4 22 4 42 0 21 -5 106 -13
            188 -19z m-2765 -326 l0 -205 -275 0 -275 0 0 205 0 205 275 0 275 0 0 -205z
            m-980 -15 l0 -190 -47 0 c-173 0 -1143 21 -1210 26 l-83 6 0 174 0 174 670 0
            670 0 0 -190z m3275 84 c6 -13 8 -79 4 -185 -4 -90 -7 -210 -8 -266 l-1 -103
            -100 0 -100 0 0 28 c0 66 20 472 25 517 l6 51 82 -11 c66 -8 84 -14 92 -31z
            m-5257 -1430 l202 -7 0 -244 0 -245 -67 6 c-38 3 -236 8 -442 12 l-373 6 6
            187 c4 102 9 212 12 245 l6 59 227 -7 c124 -3 317 -9 429 -12z m2581 -261 c15
            -302 15 -752 0 -955 l-12 -158 -353 0 -352 0 -7 79 -7 79 -49 7 -49 7 0 58 c0
            49 3 60 19 65 11 3 22 18 25 33 3 15 8 169 12 343 6 309 7 315 28 325 18 8 22
            22 33 114 6 58 12 106 12 106 1 1 133 5 295 9 l294 7 7 59 7 59 42 0 43 0 12
            -237z m-1274 186 c77 -5 161 -12 188 -15 l47 -7 0 -273 0 -274 -450 0 -450 0
            0 296 0 296 263 -7 c144 -3 325 -10 402 -16z m7495 -1519 c11 -18 100 -477
            100 -517 0 -17 -4 -35 -10 -38 -5 -3 -105 -21 -222 -40 -117 -19 -352 -57
            -522 -85 -169 -27 -324 -50 -344 -50 -19 0 -166 20 -326 45 -160 24 -463 67
            -674 93 -210 27 -385 51 -387 54 -8 8 16 83 50 153 26 53 41 105 60 214 14 80
            27 153 31 163 7 24 75 25 1262 23 816 -1 975 -3 982 -15z m-2855 -1095 l-7
            -95 135 0 136 0 6 34 c6 28 12 35 37 40 63 12 61 17 53 -106 -4 -62 -11 -117
            -15 -122 -5 -4 -43 -3 -87 4 -110 17 -190 23 -228 16 l-33 -7 -7 -124 -7 -125
            -419 0 -419 0 0 290 0 290 431 0 431 0 -7 -95z"/>
            <path d="M8616 1564 c-11 -28 -30 -249 -23 -267 5 -13 18 -17 51 -17 45 0 45
            1 57 43 6 23 12 89 13 147 l1 105 -46 3 c-36 2 -48 -1 -53 -14z"/>
            <path d="M9089 1549 c-24 -9 -28 -18 -38 -87 -7 -42 -15 -115 -18 -161 l-6
            -83 69 7 c128 12 139 16 142 54 4 39 -26 238 -39 264 -11 19 -66 22 -110 6z"/>
            </g>

            <g id="nombres">
                <text x="448" y="400" style={{fontSize: "1.7rem", fontFamily:"Helvetica Neue", fontWeight: "bold"}}>Biblioteca</text>
                <text x="210" y="560" style={{fontSize: "1.7rem", fontFamily:"Helvetica Neue", fontWeight: "bold"}}>CAE</text>
                <text x="240" y="630" style={{fontSize: "1.7rem", fontFamily:"Helvetica Neue", fontWeight: "bold"}}>Instituto de energias</text>
                <text x="285" y="660" style={{fontSize: "1.7rem", fontFamily:"Helvetica Neue", fontWeight: "bold"}}>Renovables</text>
                <text x="775" y="600" style={{fontSize: "1.7rem", fontFamily:"Helvetica Neue", fontWeight: "bold"}}>Ciencias de la salud</text>
            </g>
            
            </svg>
        </section>
        
    );
}