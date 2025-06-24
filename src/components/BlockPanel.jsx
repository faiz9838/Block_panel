import { useState } from "react";

const initialBlocks = [
    { id: "1", type: "blockA", label: "Block A1" },
    { id: "2", type: "blockB", label: "Block B1" },
    { id: "3", type: "blockA", label: "Block A2" },
    { id: "4", type: "blockB", label: "Block B2" },
];


const BlockPanel = () => {
    const [leftBlocks, setLeftBlocks] = useState(initialBlocks);
    const [rightBlocks, setRightBlocks] = useState([]);

    const handleDragStart = (e, block, source) => {
        e.dataTransfer.setData("application/reactflow", JSON.stringify(block));
        e.dataTransfer.setData("source", source);
    };

    const handleDrop = (e, target) => {
        e.preventDefault();
        const block = JSON.parse(e.dataTransfer.getData("application/reactflow"));
        const source = e.dataTransfer.getData("source");

        if (source === target) return;

        if (source === "left") {
            setLeftBlocks(leftBlocks.filter((b) => b.id !== block.id));
            setRightBlocks([...rightBlocks, block]);
        } else {
            setRightBlocks(rightBlocks.filter((b) => b.id !== block.id));
            setLeftBlocks([...leftBlocks, block]);
        }
    };

    const allowDrop = (e) => e.preventDefault();

    const renderBox = (title, blocks, boxId, color) => (
        <div
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, boxId)}
            className="w-1/4 p-4 rounded-lg shadow border border-dashed border-gray-300 bg-white min-h-[250px]"
        >
            <h2 className="text-lg font-semibold mb-3 text-center">{title}</h2>
            {blocks.length === 0 && (
                <p className="text-center text-gray-400 italic">Drop items here</p>
            )}
            {blocks.map((block) => (
                <div
                    key={block.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, block, boxId)}
                    className={`p-2 mb-2 cursor-move rounded-md shadow-sm border ${color}`}
                >
                    {block.label}
                </div>
            ))}
        </div>
    );

    return (
        <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-5xl p-6 flex flex-col gap-6 items-center">
                <h1 className="text-2xl font-bold text-gray-800">Block Panel</h1>
                <div className="flex gap-10 justify-center w-full">
                    {renderBox("Left Box", leftBlocks, "left", "bg-blue-100 border-blue-400")}
                    {renderBox("Right Box", rightBlocks, "right", "bg-green-100 border-green-400")}
                </div>
            </div>
        </div>
    );
};

export default BlockPanel;
