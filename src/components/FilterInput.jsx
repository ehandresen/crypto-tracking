function FilterInput({ filter, onFilterChange }) {
  return (
    <div className='filter'>
      <input
        type='text'
        placeholder='Search by name or symbol (e.g. BTC, Ethereum)'
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
}
export default FilterInput;
