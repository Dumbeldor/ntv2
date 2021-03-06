<?php

namespace NinjaTooken\GameBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use NinjaTooken\UserBundle\Entity\Friend;
use NinjaTooken\UserBundle\Entity\Message;
use NinjaTooken\UserBundle\Entity\MessageUser;
use NinjaTooken\UserBundle\Entity\Capture;
use NinjaTooken\UserBundle\Entity\Ip;
use NinjaTooken\GameBundle\Entity\Lobby;
use NinjaTooken\GameBundle\Entity\Ninja;
use Symfony\Component\Security\Core\Util\StringUtils;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\Security\Http\SecurityEvents;
use Symfony\Component\HttpFoundation\Cookie;

class UnityController extends Controller
{
    private $time;
    private $crypt;
    private $cryptUnity;
    private $phpsessid;
    private $gameversion;
    private $idUtilisateur;

    public function updateAction(Request $request)
    {
        $authorizationChecker = $this->get('security.authorization_checker');
        if($authorizationChecker->isGranted('IS_AUTHENTICATED_FULLY') || $authorizationChecker->isGranted('IS_AUTHENTICATED_REMEMBERED') ){
            $user = $this->get('security.token_storage')->getToken()->getUser();
            $em = $this->getDoctrine()->getManager();

            $this->time = preg_replace('/[^0-9]/i','',(string)$request->get('time'));
            $this->crypt = $request->headers->get('X-COMMON');

            $session = $this->get('session');
            $this->phpsessid = $session->getName()."=".$session->getId();

            $this->gameversion = $this->container->getParameter('unity.version');
            $this->idUtilisateur = $user->getId();
            $this->cryptUnity = $this->container->getParameter('unity.crypt');

	        $data	= '0';

            $a = $request->get('a');
            if(!empty($a)){
                $user->setUpdatedAt(new \DateTime());

                $em->persist($user);
                $em->flush();

                $ninja = $user->getNinja();

                switch($a){
                    // mise à jour du grade
                    case"g":
                        $l = $request->get('l');
						if($this->isCryptingOk($a.$l)){
                            $grade	= explode(":", $l);
							if(count($grade)==2){
                                $gameData = $this->get('ninjatooken_game.gamedata');
                                $doc = $gameData->getDocument();
								$max = $doc->getElementsByTagName('experience')->item(0)->getElementsByTagName('x')->item(99)->getAttribute('val');
								if($ninja->getExperience() - $ninja->getGrade()*$max>$max){
									$gr = intval($grade[0]);
									if($gr==$ninja->getGrade()+1){
                                        $ninja->setGrade($gr);
                                        $ninja->setAptitudeForce(0);
                                        $ninja->setAptitudeVitesse(0);
                                        $ninja->setAptitudeVie(0);
                                        $ninja->setAptitudeChakra(0);
                                        $ninja->setJutsuBoule(0);
                                        $ninja->setJutsuDoubleSaut(0);
                                        $ninja->setJutsuBouclier(0);
                                        $ninja->setJutsuMarcherMur(0);
                                        $ninja->setJutsuDeflagration(0);
                                        $ninja->setJutsuMarcherEau(0);
                                        $ninja->setJutsuMetamorphose(0);
                                        $ninja->setJutsuMultishoot(0);
                                        $ninja->setJutsuInvisibilite(0);
                                        $ninja->setJutsuResistanceExplosion(0);
                                        $ninja->setJutsuPhoenix(0);
                                        $ninja->setJutsuVague(0);
                                        $ninja->setJutsuPieux(0);
                                        $ninja->setJutsuTeleportation(0);
                                        $ninja->setJutsuTornade(0);
                                        $ninja->setJutsuKusanagi(0);
                                        $ninja->setJutsuAcierRenforce(0);
                                        $ninja->setJutsuChakraVie(0);
                                        $ninja->setJutsuFujin(0);
                                        $ninja->setJutsuRaijin(0);
                                        $ninja->setJutsuSarutahiko(0);
                                        $ninja->setJutsuSusanoo(0);
                                        $ninja->setJutsuKagutsuchi(0);

                                        $em->persist($ninja);
                                        $em->flush();

                                        $data = $gr;
                                    }else
                                        $data = $ninja->getGrade();
                                }else
                                    $data = $ninja->getGrade();
                            }else
                                $data = $ninja->getGrade();
                        }else
                            $data = $ninja->getGrade();
                        break;
                    // mise à jour du compteur de mission
                    case"m":
                        $t = $request->get('t');
						if($this->isCryptingOk($a.$t)){
                            if($t=="a"){
                                $ninja->setMissionAssassinnat($ninja->getMissionAssassinnat() + 1);

                                $em->persist($ninja);
                                $em->flush();

                                $data = $ninja->getMissionAssassinnat();
                            }elseif($t=="c"){
                                $ninja->setMissionCourse($ninja->getMissionCourse() + 1);

                                $em->persist($ninja);
                                $em->flush();

                                $data = $ninja->getMissionCourse();
                            }
                        }
                        break;
                    // mise à jour des achievements
                    case"a":
                        $l = $request->get('l');
						if($this->isCryptingOk($a.$l)){
                            $ninja->setAccomplissement($l);

                            $em->persist($ninja);
                            $em->flush();
							$data	= '1';
						}
                        break;
                    // mise à jour de la skin
                    case"s":
                        $l = $request->get('l');
						if($this->isCryptingOk($a.$l)){
							$skins	= explode(":", $l);
							if(count($skins)==6){
                                $ninja->setMasque($skins[0]);
                                $ninja->setMasqueCouleur($skins[1]);
                                $ninja->setMasqueDetail($skins[2]);
                                $ninja->setCostume($skins[3]);
                                $ninja->setCostumeCouleur($skins[4]);
                                $ninja->setCostumeDetail($skins[5]);

                                $em->persist($ninja);
                                $em->flush();
                                $data	= '1';
							}
						}
                        break;
                    // mise à jour de la classe
                    case"c":
                        $c = $request->get('c');
                        $classe = $ninja->getClasse();
                        if(empty($classe)){
						    //if($this->isCryptingOk($a.$c)){
                                $convert	= array(
                                    "355"	=> "feu",
                                    "356"	=> "eau",
                                    "357"	=> "terre",
                                    "358"	=> "foudre",
                                    "359"	=> "vent"
                                );
                                $ninja->setClasse($convert[$c]);

                                $em->persist($ninja);
                                $em->flush();
                                $data	= '1';
                            //}
                        }
                        break;
                    // mise à jour de l'expérience
                    case"e":
                        $e = (int)$request->get('e');
                        $data = $ninja->getExperience();
						if($this->isCryptingOk($data.$a.$e)){
                            $ninja->setExperience($data+$e);

                            $em->persist($ninja);
                            $em->flush();
                            $data = $ninja->getExperience();
                        }
                        break;
                    // mise à jour des niveaux
                    case"l":
                        $l = $request->get('l');
						if($this->isCryptingOk($a.$l)){
							$levels	= explode(":", $l);
							if(count($levels)==27){
                                $gameData = $this->get('ninjatooken_game.gamedata');
                                $doc = $gameData->getDocument();
								$levelUp	= $doc->getElementsByTagName('levelUp')->item(0);
								$capaciteV	= $levelUp->getElementsByTagName('capacite')->item(0)->getAttribute('val');
								$capaciteD	= $levelUp->getElementsByTagName('capacite')->item(0)->getAttribute('depart');
								$aptitudeV	= $levelUp->getElementsByTagName('aptitude')->item(0)->getAttribute('val');
								$aptitudeD	= $levelUp->getElementsByTagName('aptitude')->item(0)->getAttribute('depart');

								$experience	= $doc->getElementsByTagName('experience')->item(0)->getElementsByTagName('x');
								$k			= 0;
								foreach ($experience as $exp){
									if($exp->getAttribute('val')>$ninja->getExperience())
										break;
									$k++;
								}
								$capaciteMax	= ($capaciteD+$k*$capaciteV);
								$aptitudeMax	= ($aptitudeD+$k*$aptitudeV);

								$capaciteDem	= $levels[0]+$levels[1]+$levels[2]+$levels[3];
								$aptitudeDem	= $levels[4]+$levels[5]+$levels[6]+$levels[7]+$levels[8]+$levels[9]+$levels[10]+$levels[11]+$levels[12]+$levels[13]+$levels[14]+$levels[15]+$levels[16]+$levels[17]+$levels[18]+$levels[19]+$levels[20]+$levels[21];

                                if($capaciteMax>=$capaciteDem && $aptitudeMax>=$aptitudeDem){
									$classe	= $ninja->getClasse();
									if($classe=="terre"){
										$levels[9]	= 0;
										$levels[11]	= 0;
										$levels[12]	= 0;
										$levels[13]	= 0;
										$levels[14]	= 0;
										$levels[15]	= 0;
										$levels[17]	= 0;
										$levels[18]	= 0;
										$levels[22]	= 0;
										$levels[23]	= 0;
										$levels[25]	= 0;
										$levels[26]	= 0;
									}elseif($classe=="eau"){
										$levels[10]	= 0;
										$levels[11]	= 0;
										$levels[12]	= 0;
										$levels[13]	= 0;
										$levels[14]	= 0;
										$levels[16]	= 0;
										$levels[17]	= 0;
										$levels[18]	= 0;
										$levels[22]	= 0;
										$levels[23]	= 0;
										$levels[24]	= 0;
										$levels[26]	= 0;
									}elseif($classe=="feu"){
										$levels[9]	= 0;
										$levels[10]	= 0;
										$levels[11]	= 0;
										$levels[12]	= 0;
										$levels[15]	= 0;
										$levels[16]	= 0;
										$levels[17]	= 0;
										$levels[18]	= 0;
										$levels[22]	= 0;
										$levels[23]	= 0;
										$levels[24]	= 0;
										$levels[25]	= 0;
									}elseif($classe=="foudre"){
										$levels[9]	= 0;
										$levels[10]	= 0;
										$levels[12]	= 0;
										$levels[13]	= 0;
										$levels[14]	= 0;
										$levels[15]	= 0;
										$levels[16]	= 0;
										$levels[18]	= 0;
										$levels[22]	= 0;
										$levels[24]	= 0;
										$levels[25]	= 0;
										$levels[26]	= 0;
									}elseif($classe=="vent"){
										$levels[9]	= 0;
										$levels[10]	= 0;
										$levels[11]	= 0;
										$levels[13]	= 0;
										$levels[14]	= 0;
										$levels[15]	= 0;
										$levels[16]	= 0;
										$levels[17]	= 0;
										$levels[23]	= 0;
										$levels[24]	= 0;
										$levels[25]	= 0;
										$levels[26]	= 0;
									}
                                    $ninja->setAptitudeForce($levels[0]);
                                    $ninja->setAptitudeVitesse($levels[1]);
                                    $ninja->setAptitudeVie($levels[2]);
                                    $ninja->setAptitudeChakra($levels[3]);
                                    $ninja->setJutsuBoule(min(30, $levels[4]));
                                    $ninja->setJutsuDoubleSaut(min(30, $levels[5]));
                                    $ninja->setJutsuBouclier(min(30, $levels[6]));
                                    $ninja->setJutsuMarcherMur(min(30, $levels[7]));
                                    $ninja->setJutsuDeflagration(min(30, $levels[8]));
                                    $ninja->setJutsuMarcherEau(min(30, $levels[9]));
                                    $ninja->setJutsuMetamorphose(min(30, $levels[10]));
                                    $ninja->setJutsuMultishoot(min(30, $levels[11]));
                                    $ninja->setJutsuInvisibilite(min(30, $levels[12]));
                                    $ninja->setJutsuResistanceExplosion(min(30, $levels[13]));
                                    $ninja->setJutsuPhoenix(min(30, $levels[14]));
                                    $ninja->setJutsuVague(min(30, $levels[15]));
                                    $ninja->setJutsuPieux(min(30, $levels[16]));
                                    $ninja->setJutsuTeleportation(min(30, $levels[17]));
                                    $ninja->setJutsuTornade(min(30, $levels[18]));
                                    $ninja->setJutsuKusanagi(min(30, $levels[19]));
                                    $ninja->setJutsuAcierRenforce(min(30, $levels[20]));
                                    $ninja->setJutsuChakraVie(min(30, $levels[21]));
                                    $ninja->setJutsuFujin(min(30, $levels[22]));
                                    $ninja->setJutsuRaijin(min(30, $levels[23]));
                                    $ninja->setJutsuSarutahiko(min(30, $levels[24]));
                                    $ninja->setJutsuSusanoo(min(30, $levels[25]));
                                    $ninja->setJutsuKagutsuchi(min(30, $levels[26]));

                                    $em->persist($ninja);
                                    $em->flush();
                                    $data = '1';
								}
							}
						}
                        break;
                    // check le cheat
                    case"t":
                        $t = $request->get('t');
                        $l = $request->get('l');
                        $userCheck = null;
						if($this->isCryptingOk($a.$t.$l)){
                            $levels	= explode(":", $t);
                            if(count($levels)==28){
                                $userCheck = $em->getRepository('NinjaTookenUserBundle:User')->findOneBy(array('id' => (int)$l));
                                if($userCheck){
                                    $ninjaCheck = $userCheck->getNinja();
                                    if($ninjaCheck){
                                        // chargement du xml des données du jeu
                                        $gameData = $this->get('ninjatooken_game.gamedata');
                                        $doc = $gameData->getDocument();

                                        // l'expérience (et données associées)
                                        $experience	= $ninjaCheck->getExperience();
                                        // le grade
                                        $dan		= $ninjaCheck->getGrade();
                                        $niveau		= 0;
                                        $xpXML		= $doc->getElementsByTagName('experience')->item(0)->getElementsByTagName('x');
                                        $k			= 0;
                                        $xp			= $experience-$dan*$xpXML->item($xpXML->length-2)->getAttribute('val');
                                        foreach ($xpXML as $exp){
                                            if($exp->getAttribute('val')<=$xp)
                                                $k++;
                                            else
                                                break;
                                        }
                                        $niveau		= $xpXML->item($k>0?$k-1:0)->getAttribute('niveau');

                                        // évite d'enregistrer la valeur en bdd
                                        $force      = $ninjaCheck->getAptitudeForce();
                                        $marcherMur = $ninjaCheck->getJutsuMarcherMur();
                                        $vitesse    = $ninjaCheck->getAptitudeVitesse();
                                        if($ninjaCheck->getMissionAssassinnat()>=25)
                                            $force += 5;
                                        if($ninjaCheck->getMissionCourse()>=40){
                                            $marcherMur += 5;
                                            $vitesse += 5;
                                        }

                                        if( $force == $levels[0] &&
                                            $vitesse == $levels[1] &&
                                            $ninjaCheck->getAptitudeVie() == $levels[2] &&
                                            $ninjaCheck->getAptitudeChakra() == $levels[3] &&
                                            $ninjaCheck->getJutsuBoule() == $levels[4] &&
                                            $ninjaCheck->getJutsuDoubleSaut() == $levels[5] &&
                                            $ninjaCheck->getJutsuBouclier() == $levels[6] &&
                                            $marcherMur == $levels[7] &&
                                            $ninjaCheck->getJutsuDeflagration() == $levels[8] &&
                                            $ninjaCheck->getJutsuMarcherEau() == $levels[9] &&
                                            $ninjaCheck->getJutsuMetamorphose() == $levels[10] &&
                                            $ninjaCheck->getJutsuMultishoot() == $levels[11] &&
                                            $ninjaCheck->getJutsuInvisibilite() == $levels[12] &&
                                            $ninjaCheck->getJutsuResistanceExplosion() == $levels[13] &&
                                            $ninjaCheck->getJutsuPhoenix() == $levels[14] &&
                                            $ninjaCheck->getJutsuVague() == $levels[15] &&
                                            $ninjaCheck->getJutsuPieux() == $levels[16] &&
                                            $ninjaCheck->getJutsuTeleportation() == $levels[17] &&
                                            $ninjaCheck->getJutsuTornade() == $levels[18] &&
                                            $ninjaCheck->getJutsuKusanagi() == $levels[19] &&
                                            $ninjaCheck->getJutsuAcierRenforce() == $levels[20] &&
                                            $ninjaCheck->getJutsuChakraVie() == $levels[21] &&
                                            $ninjaCheck->getJutsuFujin() == $levels[22] &&
                                            $ninjaCheck->getJutsuRaijin() == $levels[23] &&
                                            $ninjaCheck->getJutsuSarutahiko() == $levels[24] &&
                                            $ninjaCheck->getJutsuSusanoo() == $levels[25] &&
                                            $ninjaCheck->getJutsuKagutsuchi() == $levels[26] &&
                                            $niveau == $levels[27]
                                        )
                                            $data	= '1';
                                    }
                                // peut être un visiteur : on laisse ouvert pour les petits niveaux
                                }else{
                                    $num	= 0;
                                    foreach($levels as $v)
                                        $num	+= $v;
                                    if($num<35)
                                        $data	= '1';
                                }
                            }
                        }

                        if($userCheck){
                            // check qu'un joueur avec multi-compte n'est pas déjà connecté dans une partie
                            /*if($data=='1' && $this->idUtilisateur!=(int)$l){
                                $ips = $userCheck->getIps();
                                if(!empty($ips)){
                                    // la liste des ips connues de l'utilisateur à vérifier
                                    $ipsCompare = array();
                                    foreach($ips as $ip){
                                        $ipsCompare[] = $ip->getIp();
                                    }
                                    // boucle sur les parties
                                    $lobbies = $em->getRepository('NinjaTookenGameBundle:Lobby')->findAll();
                                    if($lobbies){
                                        foreach($lobbies as $lobby){
                                            // les utilisateurs des parties
                                            $users = $lobby->getUsers();
                                            if($users){
                                                foreach($users as $user){
                                                    // les ips des utilisateurs
                                                    $userIps = $user->getIps();
                                                    if($userIps){
                                                        foreach($userIps as $ip){
                                                            if(in_array($ip->getIp(), $ipsCompare)){
                                                                $data = '0';
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    if($data=='0')break;
                                                }
                                            }
                                            if($data=='0')break;
                                        }
                                    }
                                }
                            }*/

                            // enregistre dans le lobby
                            if($data=='1'){
                                $lobby = $em->getRepository('NinjaTookenGameBundle:Lobby')
                                    ->createQueryBuilder('l')
                                    ->where(':user MEMBER OF l.users')
                                    ->setParameter('user', $user)
                                    ->setMaxResults(1)
                                    ->getQuery()
                                    ->getOneOrNullResult();
                                if($lobby){
                                    $lobby->setDateUpdate(new \DateTime());
                                    $lobby->addUser($userCheck);
                                    $em->persist($lobby);
                                    $em->flush();
                                }
                            }
                        }
                        break;
                    // apparition du yokai
                    case"y":
						if($this->isCryptingOk($a)){
                            $step			= 15;// toutes les n minutes (fixe)
                            $dateApparition	= time()-7200;
                            // vacance noel
                            if(date("YmdHi")>="201212211800" && date("YmdHi")<="201212261200")
                                $dateApparition	= time() + ($step-date("i")%$step)*60 - date("s");

                            $data	= date("Y-m-d H:i:s")."|".date("Y-m-d H:i:s", $dateApparition);
                        }
                        break;
                    // ajoute un amis
                    case"f":
                        $l = $request->get('l');
						if($this->isCryptingOk($a.$l)){
                            $userFriend = $em->getRepository('NinjaTookenUserBundle:User')->findOneBy(array('username' => base64_decode($l)));
							if($userFriend){
                                $already = $em->getRepository('NinjaTookenUserBundle:Friend')->findOneBy(array('user' => $user, 'friend' => $userFriend));
								if(!$already){
                                    // créé la liaison
                                    $friend = new Friend();
                                    $friend->setUser($userFriend);
                                    $friend->setFriend($user);

                                    $em->persist($friend);

                                    // créé le message
                                    $translator = $this->get('translator');
                                    $message = new Message();
                                    $message->setAuthor($user);
                                    $message->setNom($translator->trans('nouvelAmi.title'));
                                    $message->setContent($translator->trans('nouvelAmi.description'));

                                    // envoi au destinataire
                                    $messageUser = new MessageUser();
                                    $messageUser->setDestinataire($userFriend);
                                    $messageUser->setMessage($message);

                                    $em->persist($message);
                                    $em->persist($messageUser);

                                    $em->flush();
								}
								$data	= "1";
							}
						}
                        break;
                    // upload vers imgur
                    case"i":
                        $fileupload = $request->get('fileupload');
						if($this->isCryptingOk($a)){
                            $imgur = $this->container->getParameter('imgur');
							$ch = curl_init();
							curl_setopt($ch, CURLOPT_HEADER, 0);
							curl_setopt($ch, CURLOPT_VERBOSE, 0);
							curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
							curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
							curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
							curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible;)");
							curl_setopt($ch, CURLOPT_URL, "https://api.imgur.com/3/upload.xml");
							curl_setopt($ch, CURLOPT_POST, true);
							curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Client-ID '.$imgur) );
							curl_setopt($ch, CURLOPT_POSTFIELDS, array(
								"image"			=> $fileupload,
								"type"			=> "base64",
								"name"			=> "screenshot.jpg"
							));
							if($retour = curl_exec($ch)){
								$xml	= @simplexml_load_string($retour);
								if($xml){
									// récupérer les chemins
									try{
										if($xml['success']=="1" && $xml['status']=="200"){
											$url		= (string)$xml->link;
											$deleteHash	= (string)$xml->deletehash;

                                            $capture = new Capture();
                                            $capture->setUser($user);
                                            $capture->setUrl($url);
                                            $capture->setUrlTmb(str_replace(".jpg","s.jpg",$url));
                                            $capture->setDeleteHash($deleteHash);

                                            $em->persist($capture);
                                            $em->flush();
											$data	= "1";
										}
									}catch(Exception $e){}
								}
							}
						}
                        break;
                    // mise à jour du lobby
                    case"lu":
                        $partie = $request->get('partie');
                        $maxPlayer = $request->get('maxPlayer');
                        $carte = $request->get('carte');
                        $jeu = $request->get('jeu');
                        $version = $request->get('version');
                        $players = $request->get('players');
                        $pwd = $request->get('pwd');
						if($this->isCryptingOk($a.$partie.$maxPlayer.$carte.$jeu.$version.$players.$pwd)){

							$partie		= intval($partie);
							if(!empty($partie)){
								$players = explode("-", $players);
                                $users = array();
                                if(count($players)>0){
                                    $userRepository = $em->getRepository('NinjaTookenUserBundle:User');
                                    foreach($players as $player){
                                        $userPlayer = $userRepository->findOneBy(array('id' => $player));
                                        if($userPlayer){
                                            $users[] = $userPlayer;
                                        }
                                    }
                                }

                                $lobby = $em->getRepository('NinjaTookenGameBundle:Lobby')->findOneBy(array('partie' => $partie));
                                if($lobby){
                                    // met à jour
								    if(count($users)>0){
                                        $lobby->clearUsers();
                                        foreach($users as $userPlayer){
                                            $lobby->addUser($userPlayer);
                                        }
                                        $lobby->setDateUpdate(new \DateTime());
                                        $em->persist($lobby);
                                    }else
                                        $em->remove($lobby);
                                    $em->flush();
                                }elseif(count($users)>0){
                                    $lobby = new Lobby();
                                    $lobby->setCarte(intval($carte));
                                    $lobby->setPartie($partie);
                                    $lobby->setMaximum(intval($maxPlayer));
                                    $lobby->setJeu(intval($jeu));
                                    $lobby->setVersion((float)$version);
                                    $lobby->setPrivee($pwd);
                                    $lobby->setDateUpdate(new \DateTime());
                                    foreach($users as $userPlayer){
                                        $lobby->addUser($userPlayer);
                                    }
                                    $em->persist($lobby);
                                    $em->flush();
                                }

								$data	= '1';
							}
						}
                        break;
                    // suppression du lobby
                    case"ld":
						if($this->isCryptingOk($a)){
                            $lobby = $em->getRepository('NinjaTookenGameBundle:Lobby')
                                ->createQueryBuilder('l')
                                ->where(':user MEMBER OF l.users')
                                ->setParameter('user', $user)
                                ->setMaxResults(1)
                                ->getQuery()
                                ->getOneOrNullResult();
                            if($lobby){
                                $lobby->setDateUpdate(new \DateTime());
                                $lobby->removeUser($user);

                                if(count($lobby->getUsers())==0)
                                    $em->remove($lobby);
                                else
                                    $em->persist($lobby);
                                $em->flush();
                            }
                            $data	= '1';
                        }
                        break;
                    // amis dans le lobby
                    case"lf":
						if($this->isCryptingOk($a)){
                            $lobbyRepository = $em->getRepository('NinjaTookenGameBundle:Lobby');

                            // fait le ménage dans les lobby
                            $lobbyRepository->deleteOld();

                            // récupère les amis dans le lobby
                            $friends = $lobbyRepository->createQueryBuilder('l')
                                ->select('l.partie', 'u.username')
                                ->innerJoin('NinjaTookenUserBundle:Friend', 'f', 'WITH', 'f.friend MEMBER OF l.users')
                                ->leftJoin('NinjaTookenUserBundle:User', 'u', 'WITH', 'f.friend = u')
                                ->andWhere('f.user = :user')
                                ->andWhere('f.isConfirmed = true')
                                ->andWhere('f.isBlocked = false')
                                ->setParameter('user', $user)
                                ->setFirstResult(0)
                                ->setMaxResults(100)
                                ->getQuery();
                            $content = '<'.'?xml version="1.0" encoding="UTF-8"?'.'>';
                            $content .= '<root>';
                            $content .= '<games>';
                            $friends = $friends->getScalarResult();
                            if($friends){
                                foreach($friends as $friend){
                                    $content .= '<t game="'.addslashes($friend['partie']).'"><![CDATA['.$friend['username'].']]></t>';
                                }
                            }
                            $content .= '</games>';
                            $content .= '</root>';

                            $response = new Response($content, 200, array('Content-Type' => 'text/xml'));
                            $response->headers->set('Notice', $session->getName()."=".$session->getId());
                            return $response;
                        }
                        break;
                }
            }
            $response = new Response($data, 200, array('Content-Type' => 'text/plain'));
            $response->headers->set('Notice', $session->getName()."=".$session->getId());
            return $response;
        }
        return new Response("0", 200, array('Content-Type' => 'text/plain'));
    }

    public function connectAction(Request $request)
    {
        // initialisation
        $content = "<"."?xml version=\"1.0\" encoding=\"UTF-8\""."?><root>";
        $retour = '0';
        $friendsUsername = array();

        // données récupérées
        $this->time = preg_replace('/[^0-9]/i','',(string)$request->get('time'));
        $this->crypt = $request->headers->get('X-COMMON');

        $session = $this->get('session');
        $this->phpsessid = $session->getName()."=".$session->getId();

        $this->gameversion = $this->container->getParameter('unity.version');
        $this->cryptUnity = $this->container->getParameter('unity.crypt');
        $this->idUtilisateur = 0;

        // variables postées
        $login = $request->get('login');
        $pwd = $request->get('pwd');
        $visiteur = $request->get('visiteur');

        $em = $this->getDoctrine()->getManager();

        $maxid	= $em->getRepository('NinjaTookenUserBundle:User')
            ->createQueryBuilder('u')
            ->select('MAX(u.id)')
            ->getQuery()
            ->getSingleScalarResult();

        $authorizationChecker = $this->get('security.authorization_checker');
        // tentative de connexion
        if(!empty($login) && !empty($pwd)){
		    if($this->isCryptingOk($login.$pwd.$visiteur)){
                // récupère l'utilisateur par le login
                $user = $em->getRepository('NinjaTookenUserBundle:User')->findOneBy(array('username' => $login));
                if($user){
                    $factory = $this->get('security.encoder_factory');
                    $encoder = $factory->getEncoder($user);
                    $password = $encoder->encodePassword($pwd, $user->getSalt());
                    // vérifie que le mot de passe est ok
                    if(StringUtils::equals($password, $user->getPassword() )){
                        // lance la connexion
                        $token = new UsernamePasswordToken($user, $user->getPassword(), $this->container->getParameter('fos_user.firewall_name'), $user->getRoles());
                        $this->get('security.token_storage')->setToken($token);
                        $event = new InteractiveLoginEvent($request, $token);
                        $this->get("event_dispatcher")->dispatch(SecurityEvents::INTERACTIVE_LOGIN, $event);
                    }
                }
            }
        }

        // chargement du xml des données du jeu
        $gameData = $this->get('ninjatooken_game.gamedata');
        $doc = $gameData->getDocument();
        $xpXML = $doc->getElementsByTagName('experience')->item(0)->getElementsByTagName('x');
        $XP_LEVEL_100 = $xpXML->item($xpXML->length-2)->getAttribute('val');

        if($authorizationChecker->isGranted('IS_AUTHENTICATED_FULLY') || $authorizationChecker->isGranted('IS_AUTHENTICATED_REMEMBERED') ){
            $user = $this->get('security.token_storage')->getToken()->getUser();
            $this->idUtilisateur = $user->getId();
            // les données du joueur

            // l'avatar
            $avatar = $user->getAvatar();
            /*if($user->getUseGravatar())
                $avatar = $this->get('gravatar.api')->getUrl($user->getEmail());
            else{*/
                if(empty($avatar)){
                    if($user->getGender()=='m')
                        $avatar = $this->get('templating.helper.assets')->getUrl('bundles/ninjatookenuser/images/boyz.jpg');
                    else
                        $avatar = $this->get('templating.helper.assets')->getUrl('bundles/ninjatookenuser/images/girlz.jpg');
                }else
                    $avatar = $this->get('imagine.cache.path.resolver')->getBrowserPath('avatar/'.$avatar, 'avatar');
            //}

            $content .= '<login avatar="'.$avatar.'" id="'.$user->getId().'" maxid="'.$maxid.'"><![CDATA['.$user->getUsername()."]]></login>";

            $ninja = $user->getNinja();
            if($ninja){
                // fait le ménage dans les lobby
                $lobbies = $em->getRepository('NinjaTookenGameBundle:Lobby')
                    ->createQueryBuilder('l')
                    ->where(':user MEMBER OF l.users')
                    ->setParameter('user', $user)
                    ->getQuery()
                    ->getResult();
                if($lobbies){
                    foreach($lobbies as $l)
                        $em->remove($l);
                    $em->flush();
                }
            }else{
                // on créé l'entité "ninja"
                $ninja = new Ninja();
                $ninja->setUser($user);

                $em->persist($ninja);
                $em->flush();
            }
            // calcul l'age
            $age	= "10";
            $dateBirth = $user->getDateOfBirth();
            if($dateBirth && $dateBirth!=new \DateTime('0000-00-00 00:00:00'))
                $age = $dateBirth->diff(new \DateTime())->format('%y');
            // les données du ninja
            $clan = "";
            if($user->getClan() !== null){
                $clan = $user->getClan()->getClan()->getTag();
            }

            // permet de définir le niveau du ninja à minimum 100
            if($ninja->getExperience() < $XP_LEVEL_100){
                $ninja->setExperience($XP_LEVEL_100);
                $em->persist($ninja);
                $em->flush();
            }

            $content .= '<params force="'.$ninja->getAptitudeForce().'" vitesse="'.$ninja->getAptitudeVitesse().'" vie="'.$ninja->getAptitudeVie().'" chakra="'.$ninja->getAptitudeChakra().'" experience="'.$ninja->getExperience().'" grade="'.$ninja->getGrade().'" bouleElementaire="'.$ninja->getJutsuBoule().'" doubleSaut="'.$ninja->getJutsuDoubleSaut().'" bouclierElementaire="'.$ninja->getJutsuBouclier().'" marcherMur="'.$ninja->getJutsuMarcherMur().'" deflagrationElementaire="'.$ninja->getJutsuDeflagration().'" marcherViteEau="'.$ninja->getJutsuMarcherEau().'" changerObjet="'.$ninja->getJutsuMetamorphose().'" multishoot="'.$ninja->getJutsuMultishoot().'" invisibleman="'.$ninja->getJutsuInvisibilite().'" resistanceExplosion="'.$ninja->getJutsuResistanceExplosion().'" phoenix="'.$ninja->getJutsuPhoenix().'" vague="'.$ninja->getJutsuVague().'" pieux="'.$ninja->getJutsuPieux().'" tornade="'.$ninja->getJutsuTornade().'" teleportation="'.$ninja->getJutsuTeleportation().'" kusanagi="'.$ninja->getJutsuKusanagi().'" acierRenforce="'.$ninja->getJutsuAcierRenforce().'" chakraVie="'.$ninja->getJutsuChakraVie().'" kamiRaijin="'.$ninja->getJutsuRaijin().'" kamiSarutahiko="'.$ninja->getJutsuSarutahiko().'" kamiFujin="'.$ninja->getJutsuFujin().'" kamiSusanoo="'.$ninja->getJutsuSusanoo().'" kamiKagutsuchi="'.$ninja->getJutsuKagutsuchi().'" classe="'.$ninja->getClasse().'" masque="'.$ninja->getMasque().'" couleurMasque="'.$ninja->getMasqueCouleur().'" detailMasque="'.$ninja->getMasqueDetail().'" costume="'.$ninja->getCostume().'" couleurCostume="'.$ninja->getCostumeCouleur().'" detailCostume="'.$ninja->getCostumeDetail().'" assassinnat="'.$ninja->getMissionAssassinnat().'" course="'.$ninja->getMissionCourse().'" langue="'.$request->getLocale().'" accomplissement="'.$ninja->getAccomplissement().'" age="'.$age.'" sexe="'.($user->getGender()=='f'?'F':"H").'" roles="'.implode('-', $user->getRoles()).'" clan="'.$clan.'"/>';

            // liste d'amis
            $friends = $em->getRepository('NinjaTookenUserBundle:Friend')->getFriends($user, 100, 0);
            if($friends){
                foreach($friends as $friend){
                    $friendsUsername[]	= '<t><![CDATA['.$friend->getFriend()->getUsername().']]></t>';
                }
            }
            $retour	= '1';
        }else{
            if(!empty($visiteur)){
                $content .= '<login avatar="" id="'.($maxid+date("Hms")).'" maxid="'.$maxid.'"><![CDATA[Visiteur_'.date("Hms").']]></login>';
                $content .= '<params force="4" vitesse="3" vie="0" chakra="0" experience="'.$XP_LEVEL_100.'" grade="0" bouleElementaire="0" doubleSaut="0" bouclierElementaire="0" marcherMur="0" deflagrationElementaire="0" marcherViteEau="0" changerObjet="0" multishoot="0" invisibleman="0" resistanceExplosion="0" phoenix="0" vague="0" pieux="0" tornade="0" teleportation="0" kusanagi="0" acierRenforce="0" chakraVie="0" kamiRaijin="0" kamiSarutahiko="0" kamiFujin="0" kamiSusanoo="0" kamiKagutsuchi="0" classe="" masque="0" couleurMasque="0" detailMasque="0" costume="0" couleurCostume="0" detailCostume="0" assassinnat="0" course="0" langue="'.$request->getLocale().'" accomplissement="0000000000000000000000000" age="10" sexe="H" roles="ROLE_USER" clan=""/>';
                $retour	= '1';
            }
        }
        $content .= '<friends>';
        $content .= implode("", $friendsUsername);
        $content .= '</friends>';
        $content .= preg_replace('/\r\n|\r|\n|\t|\s\s+/m','',$gameData->getRaw());

        $facebook = $this->get('fos_facebook.api');
        $scope = implode(',', $this->container->getParameter('fos_facebook.permissions'));
        $facebookUri	= $facebook->getLoginUrl(array('display'=>'popup', 'scope'=> $scope, 'redirect_uri'=> $this->generateUrl('_security_check_facebook', array(), true)));
        $facebookUriS	= $facebook->getLoginUrl(array('display'=>'page', 'scope'=> $scope, 'redirect_uri'=> $this->generateUrl('_security_check_facebook', array(), true)));

        $content .= "<facebook><![CDATA[".$facebookUri."]]></facebook>";
        $content .= "<facebookS><![CDATA[".$facebookUriS."]]></facebookS>";
        $content .= "<retour>".$retour."</retour>";
        $content .= "</root>";

        $response = new Response($content, 200, array('Content-Type' => 'text/xml'));
        $response->headers->set('Notice', $session->getName()."=".$session->getId());

        return $response;
    }

	// fonction de cryptage
	private function isCryptingOk($val=""){
		return $this->crypt == hash("sha256", $this->cryptUnity.$this->phpsessid.$this->time.$val.$this->idUtilisateur.$this->phpsessid.$this->gameversion, false);
	}

    // récupère les données xml
    private function getDataContent(){
        return file_get_contents(dirname(__FILE__).'/../Resources/public/xml/game.xml');
    }
}
