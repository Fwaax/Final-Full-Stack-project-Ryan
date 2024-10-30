interface CoreStatCardProps {
    name: string;
    modifier: string;
    currentStat: number;
}
export default function CoreStatCard(props: CoreStatCardProps) {
    return <div className='flex flex-col items-center justify-center border border-[#bfbfba] border-solid w-[75px] h-full p-2 rounded-md bg-[#14151f]'>
        <h6>{props.name}</h6>
        <div>
            <h6>{props.modifier}</h6>
        </div>
        <h6>{props.currentStat}</h6>
    </div>
}