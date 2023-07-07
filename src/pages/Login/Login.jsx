
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
    const [cred, setCred] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const {setCurrentUser} = useContext(AuthContext);

    const getFormDetail = async () => {
      if(!cred || !pass){
        alert("all fields are mandatory");
        return;
      }
  
      let userObj = {
        cred, pass
      };
  
      let postUser = await fetch("http://localhost:8000/user/login",{
        method : "POST",
        body : JSON.stringify(userObj),
        headers : {
          "Content-Type" : "application/json"
        }
      })
      let res = await postUser.json();
      if(res.message==="user logged in successfully"){
         setCurrentUser(res.user)
         localStorage.setItem("code_for_tom_todo_user",res.user);
         navigate("/");
      }else{
        alert("wrong credentials");
      }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address / Mobile Number</FormLabel>
                            <Input type="text" value={cred} onChange={(e)=>setCred(e.target.value)} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                onClick={getFormDetail}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}