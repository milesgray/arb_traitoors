

export default function ColorGrid({name}) {
    return (
        <div className="w-[48px] grid grid-rows-3">
            {[0,1,2].map((n) => {
                return (
                    <div className="h-[16px] grid grid-cols-3">
                        {[100, 200, 300].map((v) => {
                            return (
                                <i className={`fa fa-circle text-xl text-${name}-${v+(n*300)}`} />
                            )
                        })}
                    </div>
                )
            })}            
        </div>
    )
}