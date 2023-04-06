import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, Button, IconButton } from '@mui/material'
import { useState } from 'react'

import { PhotosForm } from './PhotosForm'

import { AlertDialog } from 'src/components/Dialogs/AlertDialog'
import * as S from 'src/components/styles'
import {
  useCreatePhotosGroup,
  useDeletePhotoFromGroup,
  useDeletePhotosGroup,
  useUpdatePhotosGroup,
} from 'src/hooks/usePhotos'
import { I_Locales, lanEnumToObject } from 'src/services'
import { I_Photos } from 'src/services/photos.service'

interface I_Props {
  product_id: string
  product_url: string
  photos: I_Photos[]
}

interface I_FormData {
  main_color: I_Locales
  pill_color: I_Locales
}

const def_group: I_Photos = {
  _id: '',
  main_color: lanEnumToObject(''),
  pill_color: lanEnumToObject(''),
  path_arr: [],
}

export const PhotosList = ({ product_id, product_url, photos }: I_Props) => {
  const [editingId, setEditingId] = useState<string | null>(null)
  const { create } = useCreatePhotosGroup(product_id, product_url)
  const { update } = useUpdatePhotosGroup(product_id, product_url)
  const { delete: deleteGroup } = useDeletePhotosGroup(product_id, product_url)
  const { delete: deletePhoto } = useDeletePhotoFromGroup(product_id, product_url)
  const [creatingNew, setCreatingNew] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const initNewPhotosGroup = () => {
    setCreatingNew(true)
  }
  const createPhotosGroup = (data: I_FormData, files: File[]) => {
    const create_data = { ...data, files }
    create(create_data)
    setCreatingNew(false)
  }
  const updatePhotosGroup = (data: I_FormData, files: File[]) => {
    update({ id: editingId!, form_data: { ...data, files } })
    setEditingId(null)
  }
  const deletePhotoFromGroup = (group_id: string, path: string) => {
    deletePhoto({ id: group_id, filename: path })
  }
  const deletePhotosGroup = (group_id: string) => {
    deleteGroup(group_id)
  }
  const onDeleteClick = (id: string) => {
    setEditingId(id)
    setDeleteDialog(true)
  }
  const onConfirmDelete = () => {
    if (editingId) deletePhotosGroup(editingId)
  }
  return (
    <Box>
      {photos.map((item) => {
        const editMode = item._id === editingId
        return (
          <Box
            key={item._id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderTop: '1px solid grey',
              borderBottom: '1px solid grey',
              padding: '0.5rem',
            }}
          >
            <PhotosForm
              data={item}
              editMode={editMode}
              onCancel={() => setEditingId(null)}
              onSubmit={updatePhotosGroup}
              onDeletePhoto={(path) => deletePhotoFromGroup(item._id, path)}
            />
            {!editMode && (
              <>
                <IconButton onClick={() => setEditingId(editMode ? null : item._id)}>
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => onDeleteClick(item._id)}>
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </>
            )}
          </Box>
        )
      })}
      <Box>
        {creatingNew ? (
          <PhotosForm
            data={def_group}
            editMode={true}
            onCancel={() => setCreatingNew(false)}
            onSubmit={createPhotosGroup}
          />
        ) : (
          <Button
            onClick={initNewPhotosGroup}
            variant='outlined'
            color='inherit'
            sx={{ margin: '1rem' }}
          >
            Add photos group
          </Button>
        )}
      </Box>
      <AlertDialog
        open={deleteDialog}
        setOpen={setDeleteDialog}
        title='Delete Photos Group?'
        text='This action can not be undone'
        onAgree={onConfirmDelete}
        onCancel={() => null}
      />
    </Box>
  )
}
