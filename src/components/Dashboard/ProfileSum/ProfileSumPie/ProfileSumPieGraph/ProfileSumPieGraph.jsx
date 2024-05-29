import React, {useMemo, useRef} from 'react';
import s from './ProfileSumPieGraph.module.scss';
import {ArcElement, Chart as ChartJS, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import ProfileSumPieText from "../ProfileSumPieText/ProfileSumPieText";
import {getGroupsStatDataSum, PieExternalTooltipHandler} from "../../../dashboardTools";

const ProfileSumPieGraph = ({groupsStatData, groups, servers}) => {
    const tooltipRef = useRef(null)
    ChartJS.register(ArcElement, Tooltip);

    const maxValue = useMemo(() => {
        let val = 0;
        groupsStatData?.map(el => el.result)?.forEach(el => el ? val += getGroupsStatDataSum(el) : false);
        return val;
    }, [groupsStatData]);

    const serversStatus = useMemo(() => {
        const ids = groupsStatData?.map(el => el.id);
        const filteredServers =  servers.data?.result.filter(server => server.groups.find(group => ids.includes(String(group.id))));
        const stat = {ACTIVE: 0, PARTIALLY_ACTIVE: 0, NON_ACTIVE: 0};
        filteredServers?.forEach(server => stat[server.status] += 1);
        return stat;
    }, [groupsStatData, groups]);

    const data = {
        datasets: [
            {
                data: groupsStatData?.map(el => el.result).map(getGroupsStatDataSum),
                backgroundColor: groupsStatData?.map(el => el.color),
                borderWidth: 0,
                cutout: '55%',
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                enabled: false,
                position: 'nearest',
                external: context => PieExternalTooltipHandler(tooltipRef, context, maxValue)
            },
        },
    }

    return (
        <div className={s.main}>
            <div>
                <Doughnut data={data} options={options}/>
                <div ref={tooltipRef} className={s.tooltip}/>
                <div className={s.statServers}>
                    <div>
                        <span className={s.statNum}>{serversStatus?.ACTIVE}</span>
                        <span className={s.statTooltip}>Полностью доступный</span>
                    </div>
                    <div>
                        <span className={s.statNum}>{serversStatus?.PARTIALLY_ACTIVE}</span>
                        <span className={s.statTooltip}>Работает только на прием</span>
                    </div>
                    <div>
                        <span className={s.statNum}>{serversStatus?.NON_ACTIVE}</span>
                        <span className={s.statTooltip}>Полностью недоступные</span>
                    </div>
                </div>
            </div>
            <div>
                {groupsStatData?.map(el =>
                    <ProfileSumPieText key={el.id}
                                       color={el.color}
                                       name={el.name}
                                       value={getGroupsStatDataSum(el.result)}
                                       serversQty={groups.data?.result.find(group => group.id == el.id)?.servers?.length}
                                       maxValue={maxValue}/>)}
            </div>
        </div>
    );
};

export default ProfileSumPieGraph;