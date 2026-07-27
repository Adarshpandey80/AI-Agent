export default function Jobcard(){
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">   
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Job Title</div>
            <p className="text-gray-700 text-base">
                Company Name
            </p>
            <p className="text-gray-700 text-base">
                Location
            </p>
        </div>
        <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tag1</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tag2</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tag3</span>
        </div>
    </div>

    )
}