import { useState } from "react";
import { Search, Filter, Plus, Trash2 } from "lucide-react";

export default function AdvancedSearchFilter({ onSearch, filterFields = [], sortFields = [], searchFields = [] }) {
  const [keyword, setKeyword] = useState("");
  
  const [showFilters, setShowFilters] = useState(false);
  const [rules, setRules] = useState([]);
  const [sortOrderBy, setSortOrderBy] = useState([]);

  const handleAddRule = () => {
    setRules([...rules, { field: filterFields[0]?.value || "", operator: "eq", value: "" }]);
  };

  const handleRemoveRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleRuleChange = (index, key, val) => {
    const newRules = [...rules];
    newRules[index][key] = val;
    setRules(newRules);
  };

  const applySearch = () => {
    let advancedFilter = undefined;
    
    if (rules.length > 0) {
      const validRules = rules.filter(r => r.field && r.value !== "");
      if (validRules.length === 1) {
        advancedFilter = {
           field: validRules[0].field,
           operator: validRules[0].operator,
           value: validRules[0].value
        };
      } else if (validRules.length > 1) {
        advancedFilter = {
           logic: "and",
           filters: validRules.map(r => ({
             field: r.field,
             operator: r.operator,
             value: r.value
           }))
        };
      }
    }

    const payload = {
      advancedSearch: keyword ? {
        fields: searchFields.length > 0 ? searchFields : undefined,
        keyword: keyword
      } : undefined,
      advancedFilter,
      orderBy: sortOrderBy.length > 0 ? sortOrderBy : undefined,
      pageNumber: 0,
      pageSize: 50,
      ignorePagination: true
    };

    onSearch(payload);
    setShowFilters(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      applySearch();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 relative z-10">
      <div className="p-4 flex gap-4 items-center">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm từ khóa cơ bản..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition font-medium ${
            showFilters || rules.length > 0 ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
        >
          <Filter size={18} />
          Bộ lọc nâng cao
          {rules.length > 0 && (
            <span className="ml-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {rules.length}
            </span>
          )}
        </button>

        <button
          onClick={applySearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium shadow-sm"
        >
          Áp dụng
        </button>
      </div>

      {showFilters && (
        <div className="border-t border-gray-100 p-5 bg-gray-50/50 rounded-b-xl animate-in slide-in-from-top-2">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-sm font-bold text-gray-700">Điều kiện lọc dữ liệu</h3>
             <button onClick={handleAddRule} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded-md hover:bg-blue-50 transition">
                <Plus size={16} /> Thêm điều kiện
             </button>
          </div>

          {rules.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-lg p-6 text-center">
               <p className="text-sm text-gray-500">Chưa có điều kiện lọc nào. Nhấn "Thêm điều kiện" để bắt đầu.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rules.map((rule, idx) => (
                <div key={idx} className="flex gap-3 items-start bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                  <select
                    value={rule.field}
                    onChange={(e) => handleRuleChange(idx, "field", e.target.value)}
                    className="flex-1 p-2 border-none bg-gray-50 rounded-md text-sm focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {filterFields.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                  </select>
                  
                  <select
                    value={rule.operator}
                    onChange={(e) => handleRuleChange(idx, "operator", e.target.value)}
                    className="w-36 p-2 border-none bg-gray-50 rounded-md text-sm focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="eq">Bằng (=)</option>
                    <option value="contains">Chứa (Like)</option>
                    <option value="neq">Khác (!=)</option>
                    <option value="gt">Lớn hơn (&gt;)</option>
                    <option value="lt">Nhỏ hơn (&lt;)</option>
                  </select>

                  <input
                    type="text"
                    value={rule.value}
                    onChange={(e) => handleRuleChange(idx, "value", e.target.value)}
                    placeholder="Nhập giá trị..."
                    className="flex-1 p-2 border-none bg-gray-50 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    onClick={() => handleRemoveRule(idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition self-center"
                    title="Xóa điều kiện"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {sortFields.length > 0 && (
             <div className="mt-6 pt-5 border-t border-gray-200">
               <h3 className="text-sm font-bold text-gray-700 mb-3">Sắp xếp dữ liệu</h3>
               <div className="flex gap-3 items-center">
                  <select
                    onChange={(e) => setSortOrderBy(e.target.value ? [e.target.value] : [])}
                    className="w-1/2 p-2.5 border border-gray-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
                    defaultValue=""
                  >
                    <option value="">-- Mặc định --</option>
                    {sortFields.map(s => (
                      <optgroup label={s.label} key={s.value}>
                        <option value={`${s.value} asc`}>Tăng dần</option>
                        <option value={`${s.value} desc`}>Giảm dần</option>
                      </optgroup>
                    ))}
                  </select>
               </div>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
