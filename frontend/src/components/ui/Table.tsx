import { camelToTitleCase } from "../../lib/utils";

type TableProps<T extends Record<string, string>> = {
	data: T[];
};

const Table = <T extends Record<string, string>>({ data }: TableProps<T>) => {
	return (
		<div className="overflow-x-auto">
			<table className="table">
				{/* head */}
				<thead>
					<tr>
						<th></th>
						{Object.keys(data[0]).map((key) => (
							<th key={key} className="uppercase">
								{camelToTitleCase(key)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((record, index) => (
						<tr key={index}>
							<th>{index + 1}</th>
							{Object.values(record).map((value, index) => (
								<td key={`${index}-${value}`}>{value}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
