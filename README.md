Server Enpoints
            {
                "endpoint": "Get all the artists",
                    "request": {
                        "method": "GET",
                        "URL": "/artists",
                        "headers": false,
                        "body": false
                    },

                    "response": {
                        "headers": {
                            "Content-Type":"application/json"
                        },
                        "statusCode": 200,
                        "body": [
                            {
                                "name": "name",
                                "artistId": 1
                            }
                        ]
                    }
            },

            {
                "endpoint": "Get a specific artist's details based on artistId",
                    "request": {
                        "method": "GET",
                        "URL": "/artists/:artistId",
                        "headers": false,
                        "body": false
                    },

                    "response": {
                        "headers": {
                            "Content-Type":"application/json"
                        },
                        "statusCode": 200,
                        "body": {
                                    "name": "artistName",
                                    "artistId": 1,
                                    "albums": [
                                    {
                                        "name": "Stadium Arcadium",
                                        "albumId": 1,
                                        "artistId": 1
                                    }
                                    ]
                                }
                    }
            },
            {
                "endpoint": "Add an artist",
                "request": {
                  "method": "POST",
                  "URL": "/artists",
                  "headers": {
                    "Content-Type":"application/json"
                  },
                  "body": {
                    "name": "artistName"
                  }
                },
                "response": {
                  "headers": {
                    "Content-Type":"application/json"
                  },
                  "statusCode": 201,
                  "body": {
                    "name": "name",
                    "artistId": 1
                    }
                }
            },
                {
                    "endpoint": "Edit a specified artist by artistId",
                    "request": {
                        "method": "PUT",
                        "URL": "/artists/:artistId",
                        "headers":{
                            "Content-Type":"application/json"
                        },
                        "body": {
                            "name": "name"
                        }
                    },
                    "response": {
                        "headers": {
                            "Content-Type":"application/json"
                        },
                        "statusCode": 200,
                        "body": {
                            "name": "artistName",
                            "artistId": 1,
                            "updatedAt": "2024-05"
                        }
                    }
                },

                {
                    "endpoint": "Delete a specified artist by artistId",
                        "request": {
                            "method": "DELETE",
                            "URL": "/artists/:artistId",
                            "headers": false,
                            "body": false
                        },
                        "response": {
                            "headers": {
                                "Content-Type":"application/json"
                            },
                            "statusCode": 200,
                            "body": {"Message":"Successfully deleted item"}
                        }
                },


            {
                "endpoint": "Get all albums of a specific artist based on artistId",
                    "request": {
                        "method": "GET",
                        "URL": "/artists/:artistId/albums",
                        "headers": false,
                        "body": false
                    },
                    "response": {
                        "headers": {
                            "Content-Type":"application/json"
                        },
                        "statusCode": 200,
                        "body": [
                            {
                                "name": "albumName",
                                "albumId": 1,
                                "artistId": 1
                            }
                        ]
                    }
              },

                {
                "endpoint": "Get a specific album's details based on albumId",
                    "request": {
                        "method": "GET",
                        "URL": "/albums/:albumId",
                        "headers": false,
                        "body": false
                    },
                    "response": {
                        "headers": {
                            "Content-Type":"application/json"
                        },
                        "statusCode": 200,
                        "body":{
                            "name": "albumName",
                            "albumId": 1,
                            "artistId": 1,
                            "artist": {
                                "name": "artistName",
                                "artistId": 1
                            },
                            "songs": [
                                {
                                    "name": "songName",
                                    "lyrics": "lyrics",
                                    "trackNumber": 1,
                                    "songId": 1,
                                    "createdAt": "2024-05",
                                    "updatedAt": "2024-05",
                                    "albumId": 1
                                }
                            ]
                        }
                    }
              },

                {
                "endpoint": "Add an album to a specific artist based on artistId",
                    "request": {
                        "method": "POST",
                        "URL": "/artists/:artistId/albums",
                        "headers": {
                            "Content-Type":"application/json"
                        },
                        "body": {
                            "name":"album name"
                        }
                    },
                    "response": {
                        "headers": {
                            "Content-Type":"application/json"
                        },
                        "statusCode": 201,
                        "body": {
                            "name": "album",
                            "albumId": 2,
                            "artistId": 1
                        }
                    }
              },

            {
                "endpoint": "Edit a specified album by albumId",
                    "request": {
                        "method": "PUT",
                        "URL": "/albums/:albumId",
                        "headers": {
                            "Content-Type":"application/json"
                        },
                        "body": {
                            "name":"album name"
                        }
                    },
                    "response": {
                        "headers": {
                            "Content-Type":"application/json"
                        },
                        "statusCode": 200,
                        "body": {
                            "name": "ALBUM",
                            "albumId": 1,
                            "artistId": 1,
                            "updatedAt": "2024-05"
                        }
                    }
            },

                {
                    "endpoint": "Delete a specified album by albumId",
                        "request": {
                            "method": "DELETE",
                            "URL": "/albums/:albumId",
                            "headers": false,
                            "body": false
                        },
                        "response": {
                            "headers": {
                                "Content-Type":"application/json"
                            },
                            "statusCode": 200,
                            "body": {"Message":"Successfully deleted item"}
                        }
              },

                {
                    "endpoint": "Get all songs of a specific artist based on artistId",
                        "request": {
                            "method": "GET",
                            "URL": "/artists/:artistId/songs",
                            "headers": false,
                            "body": false
                        },
                        "response": {
                            "headers": {
                                "Content-Type":"application/json"
                            },
                            "statusCode": 200,
                            "body": [
                                {
                                    "name": "songName",
                                    "lyrics": "lyrics",
                                    "trackNumber": 1,
                                    "songId": 1,
                                    "albumId": 1
                                }
                            ]
                        }
                },
            

                {
                    "endpoint": "Get all songs of a specific album based on albumId",
                        "request": {
                            "method": "GET",
                            "URL": "/albums/:albumId/songs",
                            "headers": false,
                            "body": false
                        },
                        "response": {
                            "headers": {
                                "Content-Type":"application/json"
                            },
                            "statusCode": 200,
                            "body": [
                                {
                                    "name": "songName",
                                    "lyrics": "lyrics",
                                    "trackNumber": 1,
                                    "songId": 1,
                                    "albumId": 1
                                }
                            ]
                        }
                },

                {
                    "endpoint": "Get all songs of a specified trackNumber",
                        "request": {
                            "method": "GET",
                            "URL": "/trackNumbers/:trackNumberId/songs",
                            "headers": false,
                            "body": false
                        },
                        "response": {
                            "headers": {
                                "Content-Type":"application/json"
                            },
                            "statusCode": 200,
                            "body": [
                                {
                                    "name": "songName",
                                    "lyrics": "lyrics",
                                    "trackNumber": 1,
                                    "songId": 1,
                                    "albumId": 1
                                }
                            ]
                        }
                },
            

                {
                    "endpoint": "Get a specific song's details based on songId",
                        "request": {
                            "method": "GET",
                            "URL": "/songs/:songId",
                            "headers": false,
                            "body": false
                        },
                        "response": {
                            "headers": {
                                "Content-Type":"application/json"
                            },
                            "statusCode": 200,
                            "body": {
                                "name": "songName",
                                "lyrics": "lyrics",
                                "trackNumber": 1,
                                "songId": 1,
                                "albumId": 1,
                                "album": {
                                    "name": "ALBUM",
                                    "albumId": 1,
                                    "artistId": 1
                                },
                                "artist": {
                                    "name": "artistName",
                                    "artistId": 1
                                }
                            }
                        }
                  },

                {
                    "endpoint": "Add a song to a specific album based on albumId",
                        "request": {
                            "method": "POST",
                            "URL": "/albums/:albumId/songs",
                            "headers": {
                                "Content-Type":"application/json"
                            },
                            "body": {
                                "name": "songName",
                                "lyrics": "lyrics",
                                "trackNumber": 1
                            }
                        },
                        "response": {
                            "headers": {
                                "Content-Type":"application/json"
                            },
                            "statusCode": 201,
                            "body": {
                                "name": "songName",
                                "lyrics": "lyrics",
                                "trackNumber": 1,
                                "songId": 1,
                                "albumId": 1
                            }
                        }
                },

                {
                    "endpoint": "Edit a specified song by songId",
                        "request": {
                            "method": "PUT",
                            "URL": "/songs/:songId",
                            "headers": {
                                "Content-Type":"application/json"
                            },
                            "body": {
                                "name":"songName",
                                "lyrics":"lyrics",
                                "trackNumber": 1
                            }
                        },
                        "response": {
                            "headers": {
                                "Content-Type":"application/json"
                            },
                            "statusCode": 200,
                            "body": {
                                "name": "songName",
                                "lyrics": "lyrics",
                                "trackNumber": 1,
                                "songId": 1,
                                "albumId": 1,
                                "updatedAt": "2024-05"
                            }
                        }
                },
            

                {
                    "endpoint": "Delete a specified song by songId",
                        "request": {
                            "method": "DELETE",
                            "URL": "/songs/:songId",
                            "headers": false,
                            "body": false
                        },
                        "response": {
                            "headers": {
                                "Content-Type":"application/json"
                            },
                            "statusCode": 200,
                            "body": {"Message": "Song successfuly deleted"}
                        }
                }
            
