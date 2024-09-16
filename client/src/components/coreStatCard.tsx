interface CoreStatCardProps {
    name: string;
    modifier: number;
    currentStat: number;
}
export default function CoreStatCard(props: CoreStatCardProps) {
    return <div className='flex flex-col items-center justify-center border border-red-700 border-solid w-fit p-2 rounded-md'>
        <h6>{props.name}</h6>
        <div>
            <h6>+{props.modifier}</h6>
        </div>
        <h6>{props.currentStat}</h6>
    </div>
}