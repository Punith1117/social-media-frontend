import React, { useState, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  TextArea,
  Button,
  ErrorMessage,
  PhotoContainer,
  PhotoPreview,
  PhotoUploadContainer,
  FileInput,
  FileInputButton,
  ReadOnlyInput,
  ButtonContainer,
  FileInfo
} from './EditProfileForm.styles';

const EditProfileForm = ({ user, onCancel, onUpdate }) => {
  const { updateUserProfile, uploadProfilePhoto, deleteProfilePhoto } = useProfile();
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    bio: user?.bio || ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.profilePhotoUrl || null);
  const [photoUploading, setPhotoUploading] = useState(false);

  // Cleanup blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (photoPreview && photoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          photo: 'Please select an image file'
        }));
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          photo: 'Image size must be less than 5MB'
        }));
        return;
      }
      
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      
      // Clear photo error
      if (errors.photo) {
        setErrors(prev => ({
          ...prev,
          photo: ''
        }));
      }
    }
  };

  const handleDeletePhoto = async () => {
    if (!user?.profilePhotoUrl && !photoFile) return;
    
    setPhotoUploading(true);
    setErrors(prev => ({ ...prev, photo: '' }));
    
    try {
      const result = await deleteProfilePhoto();
      
      if (!result.success) {
        setErrors(prev => ({
          ...prev,
          photo: result.error
        }));
      } else {
        // Clear photo preview and file
        setPhotoPreview(null);
        setPhotoFile(null);
        // Notify parent component of the update
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        photo: 'Failed to delete photo'
      }));
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Upload photo first if there's a new one
      if (photoFile) {
        setPhotoUploading(true);
        const photoResult = await uploadProfilePhoto(photoFile);
        
        if (!photoResult.success) {
          setErrors({
            photo: photoResult.error
          });
          setPhotoUploading(false);
          setLoading(false);
          return;
        }
        setPhotoUploading(false);
        // Notify parent component of photo update
        if (onUpdate) onUpdate();
      }
      
      // Update profile details
      const result = await updateUserProfile(formData);
      
      if (result.success) {
        // Success - notify parent component to trigger rerender
        if (onUpdate) onUpdate();
        if (onCancel) onCancel();
      } else {
        setErrors({
          displayName: result.field === 'displayName' ? result.error : '',
          bio: result.field === 'bio' ? result.error : ''
        });
      }
    } catch (error) {
      setErrors({
        displayName: 'An unexpected error occurred',
        bio: 'An unexpected error occurred'
      });
    } finally {
      setLoading(false);
      setPhotoUploading(false);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup $delay="0s">
          <Label>Username</Label>
          <ReadOnlyInput>{user?.username || ''}</ReadOnlyInput>
        </FormGroup>
        
        <FormGroup $delay="0.1s">
          <Label>Profile Photo</Label>
          <PhotoContainer>
            <PhotoPreview 
              src={photoPreview || '/default-avatar.svg'} 
              alt="Profile preview"
            />
            <PhotoUploadContainer>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <FileInputButton 
                  type="button" 
                  onClick={() => document.getElementById('photo-upload').click()}
                  disabled={loading || photoUploading}
                >
                  {photoUploading ? 'Uploading...' : 'Choose Photo'}
                </FileInputButton>
                {(user?.profilePhotoUrl || photoFile) && (
                  <Button
                    type="button"
                    onClick={handleDeletePhoto}
                    disabled={loading || photoUploading}
                    $variant="delete"
                  >
                    Delete
                  </Button>
                )}
              </div>
              <FileInput
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                disabled={loading || photoUploading}
              />
              {photoFile && (
                <FileInfo>
                  Selected: {photoFile.name}
                </FileInfo>
              )}
            </PhotoUploadContainer>
          </PhotoContainer>
          {errors.photo && <ErrorMessage>{errors.photo}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup $delay="0.2s">
          <Label>Display Name</Label>
          <Input
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            $hasError={!!errors.displayName}
            disabled={loading}
          />
          {errors.displayName && <ErrorMessage>{errors.displayName}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup $delay="0.3s">
          <Label>Bio</Label>
          <TextArea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            $hasError={!!errors.bio}
            disabled={loading}
          />
          {errors.bio && <ErrorMessage>{errors.bio}</ErrorMessage>}
        </FormGroup>
        
        <ButtonContainer>
          <Button 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default EditProfileForm;
