import React from 'react';
import AllCmapTable from '../components/AllCmapTable';
import AllCard from './AllCard';

const All = ({data, card}) => {
    if(card){
        return (
          <div className='grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                data?.map((dt, index) => <AllCard key={index} dt={dt}></AllCard>)
            }
          </div>
        );
    }else{
        return (
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title and photo</th>
                    <th>Lost Location</th>
                    <th></th>
                    <th>Types</th>
                    <th></th>
                    <th>Date Lost</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                {data?.map((d) => (
                  <AllCmapTable key={d._id} d={d}></AllCmapTable>
                ))}
              </table>
            </div>
          </div>
        );
    }
};

export default All;