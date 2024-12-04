import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, updateItem, deleteItem } from '../../store/slices/itemsSlice';
import { FormElements } from '../Common/FormElements';
import { toast } from 'react-toastify';
import { BackIcon } from '../Common/BackIcon';

const Products = () => {
  const items = useSelector(state => state.items);
  const user = useSelector(state => state.auth.user);
  const { roles } = useSelector(state => state.roles);
  const userRole = roles.find(role => role.roleType === user.user.role);
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState({ id: null, value: '' });

  const canAdd = userRole.permissions.includes('all') || userRole.permissions.includes('write');
  const canEdit = userRole.permissions.includes('all') || userRole.permissions.includes('edit');
  const canDelete = userRole.permissions.includes('all') || userRole.permissions.includes('delete');
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) {
      toast.error('Please enter an item value');
      return;
    }
    if (items.some(item => item.value === newItem.trim())) {
      toast.error('Item already exists');
      return;
    }
    dispatch(addItem({ value: newItem }));
    setNewItem('');
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    if (!editItem.value.trim()) return;
    dispatch(updateItem({ id: editItem.id, newItem: { id: editItem.id, value: editItem.value } }));
    setEditItem({ id: null, value: '' });
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className='flex justify-between items-center'>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>
      <BackIcon />
      
      </div>
      {canAdd && (
        <form onSubmit={handleAddItem} className="mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-4/5">
              <FormElements
                elementType="input"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add new item"
                className="w-full"
                required
              />
            </div>
            <div className="w-full md:w-1/5">
              <FormElements
                elementType="button"
                type="submit"
                variant="primary"
                className="w-full bg-indigo-600 h-full hover:bg-indigo-700 text-white rounded font-medium transition duration-150 ease-in-out shadow-sm hover:shadow-md"
              >
                Add Item Name
              </FormElements>
            </div>
          </div>
        </form>
      )}
      {items.length ==0 && <div className='text-center text-gray-500'>No items found</div>}

      {items.length > 0 && (
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item,index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index+1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex gap-2 justify-end">
                    {canEdit ? (
                      <button
                        className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2
                          ${editItem.id === item.id
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
                        onClick={() => setEditItem({ id: item.id, value: item.value })}
                      >
                        { 'Edit'}
                      </button>
                    ):null}
                    {canDelete ? (
                      <button
                        className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        Delete
                      </button>
                    ):null}
                    {!canDelete && !canEdit && "--"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {editItem.id && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
            <form onSubmit={handleUpdateItem} className="space-y-4">
              <FormElements
                elementType="input"
                value={editItem.value}
                onChange={(e) => setEditItem({ ...editItem, value: e.target.value })}
                placeholder="Edit item"
              />
              <div className="flex gap-3">
                <FormElements
                  elementType="button"
                  type="submit"
                  variant="primary"
                >
                  Update
                </FormElements>
                <FormElements
                  elementType="button"
                  variant="secondary"
                  onClick={() => setEditItem({ id: null, value: '' })}
                >
                  Cancel
                </FormElements>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products; 