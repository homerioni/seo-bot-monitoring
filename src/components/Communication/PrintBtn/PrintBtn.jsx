import React, {useState} from 'react';
import s from './PrintBtn.module.scss';
import { Panel, useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng } from 'html-to-image';
import HeaderSwitchBtns from "../../headers/HeaderSwitchBtns/HeaderSwitchBtns";
const openInNewTab = (base64Image) => {
    const fixedBase64Image = base64Image.startsWith('data:image')
        ? base64Image
        : `data:image/png;base64,${base64Image}`;

    const WinPrint = window.open('/', 'example');

    WinPrint.onload = function() {
        const body = WinPrint.document.body;
        body.innerHTML = `<img src="${fixedBase64Image}" alt="" style="width: 100%; object-fit: contain;"/>`;
    };

    WinPrint.print();
    const t = setTimeout(() => {
        WinPrint.close();
        clearTimeout(t);
    }, 1500);
};

const imageWidthV = 1500;
const imageHeightSizeV = 2160;
const imageWidthH = 2200;
const imageHeightSizeH = 1500;

function PrintBtn() {
    const {getNodes} = useReactFlow();
    const [pages, setPages] = useState(1);
    const [orientation, setOrientation] = useState('vertical');
    const onClick = () => {
        const imageWidth = orientation === 'vertical' ? imageWidthV : imageWidthH;
        const imageHeight = pages * (orientation === 'vertical' ? imageHeightSizeV : imageHeightSizeH);
        const nodesBounds = getRectOfNodes(getNodes());
        const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

        toPng(document.querySelector('.react-flow__viewport'), {
            backgroundColor: 'transparent',
            width: imageWidth,
            height: imageHeight,
            style: {
                width: imageWidth,
                height: imageHeight,
                transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
            },
        }).then(openInNewTab);
    };

    return (
        <Panel position="top-right">
            <div className={s.btnBox}>
                <div className={s.switchBox}>
                    <HeaderSwitchBtns active={orientation}
                                      setActive={setOrientation}
                                      bgStyleDefault={{width: '9rem', left: '.4rem'}}
                                      buttons={[
                                          {name: 'Верт.', val: 'vertical'},
                                          {name: 'Горз.', val: 'horizontal'},
                                      ]}/>
                </div>
                <div className={s.printBtn}>
                    <div>
                        <div className={s.number}>{pages} стр.</div>
                        <div className={s.operand}>
                            <button className={s.plus} onClick={() => setPages(pages + 1)}/>
                            <button className={s.minus} onClick={() => pages > 1 && setPages(pages - 1)}/>
                        </div>
                    </div>
                    <button className={s.btn} onClick={onClick}>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 573.75 573.75">
                            <rect stroke={'white'} fill={'white'} x="143.438" y="439.875" width="286.875" height="19.125"/>
                            <rect stroke={'white'} fill={'white'} x="143.438" y="497.25" width="286.875" height="19.125"/>
                            <circle stroke={'white'} fill={'white'} cx="449.438" cy="267.75" r="19.125"/>
                            <path stroke={'white'} fill={'white'} d="M506.812,172.125h-38.25V38.25c0-21.038-17.213-38.25-38.25-38.25H143.438c-21.038,0-38.25,17.212-38.25,38.25v133.875 h-38.25c-32.513,0-57.375,24.862-57.375,57.375v172.125C9.562,434.138,34.425,459,66.938,459h38.25v76.5 c0,21.037,17.212,38.25,38.25,38.25h286.875c21.037,0,38.25-17.213,38.25-38.25V459h38.25c32.513,0,57.375-24.862,57.375-57.375 V229.5C564.188,196.987,539.325,172.125,506.812,172.125z M124.312,38.25c0-9.562,7.65-19.125,19.125-19.125h286.875 c9.562,0,19.125,7.65,19.125,19.125v133.875H124.312V38.25z M449.438,535.5c0,9.562-7.65,19.125-19.125,19.125H143.438 c-9.562,0-19.125-7.65-19.125-19.125V401.625h325.125V535.5z M545.062,401.625c0,21.037-17.213,38.25-38.25,38.25h-38.25V382.5 H105.188v57.375h-38.25c-21.038,0-38.25-17.213-38.25-38.25V229.5c0-21.038,17.212-38.25,38.25-38.25h439.875 c21.037,0,38.25,17.212,38.25,38.25V401.625z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </Panel>
    );
}

export default PrintBtn;