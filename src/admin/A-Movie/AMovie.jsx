import React, { useEffect, useState } from 'react'
import './Amovie.css'

import MovieService from '../../service/MovieService'
import { Row, Col, Form, Card, ListGroup, } from 'react-bootstrap';
import AgeLimitService from '../../service/AgeLimitService';
import TypeService from '../../service/TypeService';
import { toast } from 'react-toastify';
import ActorService from '../../service/ActorService';

export default function AMovie() {
    const [movies, setMovies] = useState([]);
    const [add, setAdd] = useState(false);
    const [actors,setActors] = useState([]);
    const [AddDV, setAddDV] = useState(false);
    const [selectedActors,setSelectedActors] = useState([]);
    const [selectedDV,setSelectedDV] = useState([]);
    const [flim, setFlim]= useState({
      types :["1"]
    });
    const [ageLimit, setAgeLimit]= useState([]);
    const [type, setType]= useState([])
    const [addAgeLimit, setAddAgeLimit]= useState(false);
    const [newAge, setNewAge]= useState({
      limit_name: null,
      limit_age: null,
      limit_bio: null
    });
    const [avata,setAvata] = useState();
const handleXbutton = (e) => {
  setAddAgeLimit(true);   e.preventDefault();
}
const handle2Xbutton = (e) => {
  setAddDV(true);   e.preventDefault();
}
const handle3Xbutton = (e) => {
  setAddType(true) ;  e.preventDefault();
}
const handle5Xbutton = (e) => {
  setAddDD(true) ;  e.preventDefault();
}
    const handleChangeImg = (e) => {

      setAvata(URL.createObjectURL(e.target.files[0]));
    }
    const [addType, setAddType] = useState(false);
    const [addDD,setAddDD] = useState(false);
    const [updatedFlim,setUpdateFilim] = useState({});
    useEffect(() => {
        MovieService.getAllMovie().then((response) => {
            setMovies(response.data);
        }); 
        
        AgeLimitService.getAll().then((response) => { 
          setAgeLimit(response.data);
        });
        TypeService.getAll().then((response) => {
          setType(response.data);
        });
        ActorService.getAll().then((response) => {
          setActors(response.data);
        });
    },[]);
    const handleInputChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setFlim({ ...flim, [name]: value });
    };
    const handleAgeChange = (e) => {
      const { name, value } = e.target;
      setNewAge({ ...newAge, [name]: value });
    };
     const handleTypeChange =(e) => {
      const { name, value } = e.target;
      setAddType({...addType,[name]:value})
     };

     const handleSubmit = (event) => {
      event.preventDefault();
      let dv="";
      selectedDV.forEach((act) => {
          dv+=act.actor_id+","
      });
      let dd ="";
      selectedActors.forEach((act) => {
        dd+=act.actor_id+","
      })
      let t = "";
      flim.types.forEach((ty)=> {
        t+=ty+","
      })
      setUpdateFilim (flim => ({
        ...flim, 
        "actors": dv,
        "directors": dd,
        "types_m": t})
      );
console.log(flim)
      
      // Assuming flim is a state variable and setFlim is a function to update it
     
        
      // Note that this may not immediately reflect the updated value
    };
    useEffect(()=> {
      const flimToSend = { ...updatedFlim,...flim };
        delete flimToSend.types;
        console.log(flimToSend)
       // Since setFlim is an asynchronous function, the updated value might not be immediately reflected here
       // Consider using the updated value in the callback of setFlim if required
       if(flimToSend) {
       MovieService.create( flimToSend).then((response)=> {
         console.log(response.data);
         if(avata)
         MovieService.poster(response.data.movie_id,avata)   
         toast.info('Thêm thành cônng', {
           position: 'top-right',
           autoClose: 3000,
       });
       setFlim({
         ageLimit:'',
         movie_vietnamese_title: '',
         movie_english_title: '',
         movie_release_date: '',
         movie_summary:'',
         lenght:'',
         movie_trailer_ulr:'',
         movie_poster_ulr: '',
         movie_actors:'',
         actors:'',
         directors:'',
         types_m:'',
         types: ["1"]
       })
       setSelectedDV([]);
       setSelectedActors([])
       setAvata("")
       })
       .catch((error) => {
         // Handle error if MovieService.create fails
         toast.error('Thêm thất bại', {
           position: 'top-right',
           autoClose: 3000,
       });
       }); }
    },[updatedFlim])
    const handleAgeSubmit = (event) => {
      event.preventDefault();
      if (newAge.limit_name && newAge.limit_age && newAge.limit_bio) {
        AgeLimitService.createAgeLimit(newAge).then((response) => {
          if(response.data.limit_id) {
            toast.info('Đã thêm thành công Giới hạng độ tuổi mới', {
              position: 'top-right',
              autoClose: 3000,
          });
          TypeService.getAll().then((response) => {
            setType(response.data);
          });
          setNewAge({
            limit_name: '',
            limit_age: '',
            limit_bio: ''
          })  
          }
        })
      } else {
        toast.error('Thêm thất bại', {
          position: 'top-right',
          autoClose: 3000,
      });
      }
    };
    const handleTypeSumit =(event) => {
      event.preventDefault();
      if(addType.type_name && addType.type_bio) {
        TypeService.create(addType).then((response)=> {
          if(response.data.type_id) {
            toast.info('Đã thêm thành công thể loại mới', {
              position: 'top-right',
              autoClose: 3000,
          });
          setAddType({
            type_name: '',
            type_bio: ''
          })
          }
          else
          toast.error('Thêm thất bại', {
            position: 'top-right',
            autoClose: 3000,
        });
        })
      }
    }
    const handleOnClickSelect = (event) => {
      const option = event.target.value;
      const selected = flim.types;
    
      if (selected.includes(option)) {
        const updatedTypes = selected.filter((type) => type !== option);
        setFlim({ ...flim, types: updatedTypes });
      } else {
        setFlim({ ...flim, types: [...flim.types, option] });
      }
    };

    const handleCancelAge =() => {
        setNewAge({
          limit_name: '',
          limit_age: '',
         limit_bio: ''
        })  
        console.log(newAge)
    }
    const handleCancelType = () => {
      setAddType({
        type_name: '',
        type_bio: ''
      })
    }
    const handleActorSelection = (sactor) => {
      if(selectedActors.includes(sactor)) {
        const updateList = selectedActors.filter((selectedActor) => selectedActor.actor_id !== sactor.actor_id)
        setSelectedActors(updateList)
        console.log(selectedActors.includes(sactor),selectedActors);
    
      }
      else{
        const updateList =[sactor,...selectedActors]
        setSelectedActors(updateList)
        console.log(selectedActors.includes(sactor),selectedActors);
    
      }
    
    //  console.log(selectedActors.includes(sactor),selectedActors);
    }
    const [newActors,setNewActor]  = useState();
    const handleAddActor = () => {
       ActorService.create({
        "actor_name":  newActors,
       }).then((response)=> {
        if (response.data.actor_id) {
          setActors([...actors,response.data]);
          setSelectedActors([...selectedActors,response.data])
          setNewActor('');
          toast.info('Đã thêm thành công Nghệ sỉ mới', {
            position: 'top-right',
            autoClose: 3000,
        })
      } else {
        toast.error('Đã thêm Nghệ sỉ mới thất baij', {
          position: 'top-right',
          autoClose: 3000,
      })
        }
       })
    }
    const handleAddActorDV = () => {
      ActorService.create({
       "actor_name":  newActors,
      }).then((response)=> {
       if (response.data.actor_id) {
         setActors([...actors,response.data]);
         setSelectedDV([...selectedDV,response.data])
         setNewActor('');
         toast.info('Đã thêm thành công Nghệ sỉ mới', {
           position: 'top-right',
           autoClose: 3000,
       })
     } else {
       toast.error('Đã thêm Nghệ sỉ mới thất baij', {
         position: 'top-right',
         autoClose: 3000,
     })
       }
      })
   }
    const [newDV, setNewDV ] = useState();
    const handleDVSelection = (sactor) => {
      if(selectedDV.includes(sactor)) {
        const updateList = selectedDV.filter((selectedActor) => selectedActor.actor_id !== sactor.actor_id)
        setSelectedDV(updateList)
        console.log(selectedDV.includes(sactor),selectedDV);
      }
      else{
        const updateList =[sactor,...selectedDV]
        setSelectedDV(updateList)
        console.log(selectedDV.includes(sactor),selectedDV);
    
      }}
    return (
        <Row className='amovie d-flex flex-row'>
           <Col lg={5} className='movie-poster' onClick={()=>setAdd(true)}>
           <button className='add-movie-btn'  > +</button>
             <span className='h3'> Thêm phim mới </span>
           </Col>
            {movies.map((movie) => (
                <Col lg={5}  className='movie-poster' key={movie.movie_id}>
                    <Row className='d-flex flex-row'>
                        <Col lg={6}>
                            <img src={`/poster/${movie.movie_id}.jpeg`} alt={movie.movie_vietnamese_title} />
                        </Col>
                        <Col lg={6}>
                            <h3 className='mt-2 text-sm font-bold pr-10'>{movie.movie_vietnamese_title}</h3>
                            <p className='mt-1 text-sm hidden md:block'>Khởi chiếu: {movie.movie_release_date}</p>
                            <p className='line-clamp-2 mt-1 text-xs md:text-sm text-red-500'> {movie.ageLimit?.limit_name} - {movie.ageLimit?.limit_bio} </p>
                        </Col>
                    </Row>
                </Col>
            ))}
            {add && <Row className='add-movie'>
            <Form onSubmit={ handleSubmit }>
            <button  className='btn btn-danger cancer-btn' onClick={()=>setAdd(false)}> X</button>
            <Row>   
              <h3> Thêm phim mới </h3>
              <Row lg={12} >
              <label htmlFor="img-input" className="movie-poster" > tải lên poster</label>
<input
  type="file"
  id="img-input"
  className="img-input"
  onChange={handleChangeImg}
  style={{ display: 'none' }} // This hides the input field
/>
<img className='movie-poster'  htmlFor="img-input" src={avata ? avata : "/poster/default_poster.jpg"} alt="Poster của phim"  />
              <div className='d-flex flex-row align-items-center mb-4 label'>
              <i class="fa-solid fa-film"></i>
            <input 
              className={`w-100 text-input }`}
              type='text' 
              placeholder='nhập tên phim' 
              value={flim.movie_vietnamese_title}  
              name="movie_vietnamese_title" 
              onChange={handleInputChange}  
              >
              </input>
              </div> <div className='d-flex flex-row align-items-center mb-4 label'>
              <i class="fa-solid fa-film"></i>
            <input 
              className={`w-100 text-input }`}
              type='text' 
              placeholder='nhập tên phim tiếng Anh' 
              value={flim.movie_english_title}  
              name="movie_english_title" 
              onChange={handleInputChange}  
              >
              </input>
              </div>
            <div className='d-flex flex-row align-items-center mb-4 label'>
              <i class="fa-solid fa-calendar-days"></i>
            <input 
              className={`w-100 text-input }`}
              type='date' 
              placeholder='chọn ngày công chiếu' 
              value={flim.movie_release_date}  
              name="movie_release_date" 
              onChange={handleInputChange}  
              >
              </input>
            </div>
            <div className='d-flex flex-row align-items-center mb-4 label'>
            <i class="fa-solid fa-audio-description"></i>
            <input 
              className={`w-100 text-input }`}
              type='text' 
              placeholder='tóm tắt phim' 
              value={flim.movie_summary}  
              name="movie_summary"  
              onChange={handleInputChange}  
              >
              </input>
            </div>
            <div className='d-flex flex-row align-items-center mb-4 label'>
            <i class="fa-solid fa-audio-description"></i>
            <input 
              className={`w-100 text-input }`}
              type='number' 
              placeholder='thời lượng phim' 
              value={flim.lenght}  
              name="lenght"  
              onChange={handleInputChange}  
              >
              </input>
            </div>
            <div className='d-flex flex-row align-items-center mb-4 label'>
            <i class="fa-solid fa-link"></i>
            <input 
              className={`w-100 text-input }`}
              type='text' 
              placeholder='link trailer' 
              value={flim.movie_trailer_ulr}  
              name="movie_trailer_ulr"  
              onChange={handleInputChange}  
              >
              </input>
            </div>
            <div className='d-flex flex-row align-items-center mb-4 label'>
            <i class="fa-solid fa-flag-checkered"></i>
            <Form.Label>Giới hạn độ tuổi:</Form.Label>
            <Form.Control 
            as="select"
            value={flim.ageLimit} 
            onChange={handleInputChange}
            name= "ageLimit"
            >
               <option value="">Chọn giới hạn tuổi</option>
              {
              ageLimit.map((limit)=> (
                  <option key={limit.limit_id}  value={limit.limit_id} >
                         {limit.limit_name} - {limit.limit_bio}
                  </option>
              ))}
             </Form.Control>
             <button className='btn btn-dark' onClick={()=>(handleXbutton)}>+</button>
            </div>
            <div className='d-flex flex-row align-items-center mb-4 label'>
            <i class="fa-solid fa-flag-checkered"></i>
            <Form.Label>Thể loại phim </Form.Label>
            <Form.Select
            as="select"
            multiple
            value={flim.types} 
            //onChange={ handleSelectChange}
            >
              {
              type.map((type)=> (
                  <option key={type.type_id}  value={type.type_id} onClick={handleOnClickSelect} >
                    {type.type_name}
                  </option>
              ))}
             </Form.Select>
             <button className='btn btn-dark' onClick={handle3Xbutton}>+</button>
            </div>
            <div className='d-flex flex-row align-items-center mb-4 label'>
            <i class="fa-solid fa-flag-checkered"></i>
            <Form.Label>Đạo diễn</Form.Label>
            
             <button className='btn btn-dark' onClick={handle5Xbutton}>+</button>
              {selectedActors.map((actor) => (
                 <Card >
                  <Card.Body>
                    <div className=''>
                    <img src="/poster/1.jpeg" className="rounded-circle" alt="Avatar" width="150" height="150" />
                    <h5 className="">{actor.actor_name}</h5>
                </div>
                
                  </Card.Body>
                </Card>
              ))}
            </div>
            <div className='d-flex flex-row align-items-center mb-4 label'>
            <i class="fa-solid fa-flag-checkered"></i>
            <Form.Label>Các điễn viên</Form.Label>
            
             <button className='btn btn-dark' onClick={ handle2Xbutton}>+</button>
              {selectedDV.map((actor) => (
                 <Card >
                  <Card.Body>
                    <div className=''>
                    <img src="/poster/1.jpeg" className="rounded-circle" alt="Avatar" width="150" height="150" />
                    <h5 className="">{actor.actor_name}</h5>
                </div>
                
                  </Card.Body>
                </Card>
              ))}
            </div>
            <div>
            <button className='btn btn-primary'>Đăng</button>
            </div>
           </Row>
         
            </Row>  
          
            </Form>  
            </Row>}
            {addAgeLimit && <Row className='add' >
            <div className='d-flex flex-row-reverse'><button  className='btn btn-danger cancer-btn' onClick={()=>setAddAgeLimit(false)}> X</button>
              </div><Form onSubmit={  handleAgeSubmit } >
                <h4> Thêm độ tuổi mới</h4>
                <div className='d-flex flex-row align-items-center mb-4 label'>
                <i class="fa-solid fa-tag"></i>
            <input 
              className={`w-100 text-input }`}
              type='text' 
              placeholder='Ký hiệu của giới hạn độ tuổi'
              value={newAge.limit_name}  
              name="limit_name"  
              onChange={handleAgeChange}  
              >
              </input>
            </div>
            <div className='d-flex flex-row align-items-center mb-4 label'>
                <i class="fa-solid fa-tag"></i>
            <input 
              className={`w-100 text-input }`}
              type='number' 
              placeholder='Độ tuổi tối thiệu được phép xem phim'
              value={newAge.limit_age}  
              name="limit_age"  
              onChange={handleAgeChange}  
              >
              </input>
            </div>
            <div className='d-flex flex-row align-items-center mb-4 label'>
                <i class="fa-solid fa-tag"></i>
            <input 
              className={`w-100 text-input }`}
              type='text' 
              placeholder='Miêu tả giớ hạn độ tuổi'
              value={newAge.limit_bio}  
              name="limit_bio"  
              onChange={handleAgeChange}  
              >
              </input>
            </div>
            <button className='btn btn-primary' >Thêm vào</button>
            <button className='btn btn-cancel' onClick={handleCancelAge} >Hủy bỏ</button>
                </Form>
              </Row>}
            {addType && <Row  className='add'>
            <div className='d-flex flex-row-reverse'>
                <button  className='btn btn-danger cancer-btn' onClick={()=>setAddType(false)}> X</button>
            </div>
            <h4>Thêm thể loại mới</h4>
                <Form onSubmit={handleTypeSumit}>
                <div className='d-flex flex-row align-items-center mb-4 label'>
                <i class="fa-solid fa-tag"></i>
            <input 
              className={`w-100 text-input }`}
              type='text' 
              placeholder='Tên Thể loại'
              value={addType.type_name}  
              name="type_name"  
              onChange={handleTypeChange}  
              >
              </input>
            </div >
            <div className='d-flex flex-row align-items-center mb-4 label'>
                <i class="fa-solid fa-tag"></i>
            <input 
              className={`w-100 text-input }`}
              type='text' 
              placeholder='Miêu tả thể loại'
              value={addType.type_bio}  
              name="type_bio"  
              onChange={handleTypeChange}  
              >
              </input>
            </div>
                 <button className='btn btn-primary' >Thêm vào</button>
              <button className='btn btn-cancel' onClick={handleCancelType} >Hủy bỏ</button>
                </Form>
              </Row>
            }
            {addDD && <Row className='add'>
              <div className='d-flex flex-row-reverse'>
             <button  className='btn btn-danger cancer-btn ' onClick={()=>setAddDD(false)}> X</button>
             </div>
             <h5> Thêm đạo điễn</h5>
              <ListGroup>
                <ListGroup.Item><input
                type='text'
                placeholder='Thêm đạo điễn mới '
                value={newActors}
                onChange={(e) => setNewActor(e.target.value)}
                ></input>
                <button className='btn btn-secondary' onClick={handleAddActor} >Thêm</button></ListGroup.Item>
              {actors?.map((actor) => (
    <ListGroup.Item key={actor.actor_id}>
        <input  
            type='checkbox'
            onChange={() => handleActorSelection(actor)}
            checked={selectedActors.includes(actor)}
        />
        {actor.actor_name}
       
    </ListGroup.Item>
))}

              </ListGroup>
             
            </Row>}
            {AddDV && <Row className='add'>
              <div className='d-flex flex-row-reverse'>
             <button  className='btn btn-danger cancer-btn ' onClick={()=>setAddDV
              
              
              
              
              (false)}> X</button>
             </div>
             <h5> Thêm Diễn viên</h5>
              <ListGroup>
                <ListGroup.Item><input
                type='text'
                placeholder='Thêm diễn viên mới '
                value={newDV}
                onChange={(e) => setNewActor(e.target.value)}
                ></input>
                <button className='btn btn-secondary' onClick={handleAddActorDV } >Thêm</button></ListGroup.Item>
              {actors?.map((actor) => (
    <ListGroup.Item key={actor.actor_id}>
        <input  
            type='checkbox'
            onChange={() => handleDVSelection(actor)}
            checked={selectedDV.includes(actor)}
        />
        {actor.actor_name}
       
    </ListGroup.Item>
))}

</ListGroup>
             
             </Row>}
        </Row>
    );
    
}
