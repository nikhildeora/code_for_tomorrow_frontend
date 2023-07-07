import { ReactNode, useContext } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { AuthContext } from '../../context/AuthContext';
import { Link as RouterLink } from "react-router-dom";


export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { userlogged,setUserLogged } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <RouterLink to="/">Home</RouterLink>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              {userlogged ?
                <Button onClick={()=>{
                  localStorage.removeItem("code_for_tom_todo_user");
                  setUserLogged(null)}}> Logout </Button> 
                :
                <>                
                <RouterLink to="signup"><Button> Signup </Button></RouterLink>
                  <RouterLink to="login"><Button> Login </Button></RouterLink>
                </>

              }

            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}